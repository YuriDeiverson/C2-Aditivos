/**
 * Opcional: cria utilizador no Auth (API admin) e define role = admin em public.profiles.
 * Requer SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, DEV_ADMIN_EMAIL e DEV_ADMIN_PASSWORD em backend/.env
 *
 * Uso: cd backend && npm install && npm run seed:admin
 *
 * Alternativa recomendada: criar utilizador no dashboard Supabase ou na loja e executar:
 *   UPDATE public.profiles SET role = 'admin' WHERE email = '...';
 */
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.DEV_ADMIN_EMAIL?.trim();
const adminPassword = process.env.DEV_ADMIN_PASSWORD;

if (!url || !serviceKey) {
  console.error("Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no ficheiro backend/.env");
  console.error("Veja backend/env.example");
  process.exit(1);
}

if (!adminEmail || !adminPassword) {
  console.error("Defina DEV_ADMIN_EMAIL e DEV_ADMIN_PASSWORD no backend/.env para usar este script.");
  console.error("Ou promova um utilizador existente no SQL Editor:");
  console.error("  UPDATE public.profiles SET role = 'admin' WHERE email = 'seu@email.com';");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function resolveUserIdFromProfile() {
  const { data, error } = await supabase.from("profiles").select("id").eq("email", adminEmail).maybeSingle();
  if (error) throw error;
  return data?.id ?? null;
}

async function main() {
  const createRes = await supabase.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true,
    user_metadata: { full_name: "Administrador" },
  });

  let userId = createRes.data?.user?.id ?? null;

  if (createRes.error) {
    const msg = createRes.error.message || "";
    if (!/already|exists|registered/i.test(msg)) {
      console.error(createRes.error);
      process.exit(1);
    }
    userId = await resolveUserIdFromProfile();
    if (!userId) {
      console.error("O e-mail já existe no Auth mas não há linha em public.profiles. Corrija manualmente no SQL.");
      process.exit(1);
    }
    console.log("Utilizador já existia; a atualizar perfil para admin…");
  } else {
    console.log("Utilizador criado no Auth.");
  }

  const { error: upErr } = await supabase.from("profiles").update({ role: "admin" }).eq("id", userId);
  if (upErr) {
    console.error("Falha ao definir role=admin:", upErr.message);
    process.exit(1);
  }

  console.log("\nPerfil definido como admin para:", adminEmail);
  console.log("Inicie sessão em /admin/login com a palavra-passe que definiu em DEV_ADMIN_PASSWORD.\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
