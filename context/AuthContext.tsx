"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthChangeEvent, Session, SupabaseClient, User } from "@supabase/supabase-js";
import { getBrowserSupabase, isSupabaseBrowserConfigured } from "@/lib/supabase/browser";
import type { Profile } from "@/types/auth";

type AuthState = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  configured: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const configured = isSupabaseBrowserConfigured();

  useEffect(() => {
    if (!configured) {
      setSupabase(null);
      setLoading(false);
      return;
    }
    const client = getBrowserSupabase();
    setSupabase(client);
    if (!client) setLoading(false);
  }, [configured]);

  const loadProfile = useCallback(
    async (uid: string) => {
      if (!supabase) return;
      const { data } = await supabase.from("profiles").select("*").eq("id", uid).maybeSingle();
      setProfile((data as Profile) ?? null);
    },
    [supabase]
  );

  useEffect(() => {
    if (!supabase) return;

    let cancelled = false;

    const init = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (cancelled) return;
        if (error) {
          console.warn("auth getSession:", error.message);
        }
        const u = data.session?.user ?? null;
        setUser(u);
        if (u) {
          try {
            await loadProfile(u.id);
          } catch (e) {
            console.warn("auth profile:", e);
          }
        }
      } catch (e) {
        if (!cancelled) {
          console.warn("auth init:", e);
          setUser(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void init();

    const safetyTimer = window.setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, 8000);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event: AuthChangeEvent, session: Session | null) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        try {
          await loadProfile(u.id);
        } catch (e) {
          console.warn("auth profile (listener):", e);
        }
      } else {
        setProfile(null);
      }
    });

    return () => {
      cancelled = true;
      window.clearTimeout(safetyTimer);
      subscription.unsubscribe();
    };
  }, [supabase, loadProfile]);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }, [supabase]);

  const refreshProfile = useCallback(async () => {
    if (user && supabase) await loadProfile(user.id);
  }, [user, supabase, loadProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        configured,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
