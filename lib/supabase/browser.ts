import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Substitui o Web Locks API do GoTrue por uma fila FIFO na mesma aba.
 * Evita `Lock "…auth-token" was released because another request stole it` quando
 * há init + refresh + navegação em paralelo (ex.: React Strict Mode, vários GET RSC).
 */
function createSerializedAuthLock(): <R>(name: string, acquireTimeout: number, fn: () => Promise<R>) => Promise<R> {
  let chain: Promise<unknown> = Promise.resolve();
  return <R,>(_name: string, _acquireTimeout: number, fn: () => Promise<R>): Promise<R> => {
    const run = chain.then(() => fn()) as Promise<R>;
    chain = run.then(
      () => undefined,
      () => undefined
    );
    return run;
  };
}

/** True when as chaves públicas existem (SSR incluído — não depende de `window`). */
export function isSupabaseBrowserConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.length &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length
  );
}

export function getBrowserSupabase(): SupabaseClient | null {
  if (typeof window === "undefined") return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!client) {
    client = createBrowserClient(url, key, {
      auth: {
        lock: createSerializedAuthLock(),
      },
    });
  }
  return client;
}
