/** Mensagens em português para erros comuns do Supabase Auth. */
export function formatAuthLoginError(message: string | undefined): string {
  const m = (message ?? "").toLowerCase();
  if (m.includes("email not confirmed") || m.includes("email_not_confirmed")) {
    return "Este e-mail ainda não foi confirmado. Abra o link que enviamos para a sua caixa de entrada (e pasta de spam). Em desenvolvimento, pode confirmar manualmente em Supabase → Authentication → Users → selecionar o utilizador → Confirm email.";
  }
  return message ?? "Erro ao iniciar sessão.";
}
