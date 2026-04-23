import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/** Evita open redirect: só caminhos relativos ao site. */
function safeRelativeNext(next: string | null, fallback: string) {
  if (!next || next.length === 0) return fallback;
  if (!next.startsWith("/") || next.startsWith("//")) return fallback;
  return next;
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const origin = new URL(request.url).origin;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.redirect(`${origin}/login?error=config`);
  }

  let nextPath = "/login";
  try {
    const formData = await request.formData();
    const raw = formData.get("next");
    nextPath = safeRelativeNext(typeof raw === "string" ? raw : null, "/login");
  } catch {
    /* sem corpo */
  }

  const response = NextResponse.redirect(new URL(nextPath, request.url));

  const cookieStore = await cookies();
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  await supabase.auth.signOut();
  return response;
}
