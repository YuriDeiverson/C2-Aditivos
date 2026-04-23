/** Consulta CEP na API pública ViaCEP (sem chave). */
export async function fetchViaCep(cepRaw: string): Promise<{ ok: true; cep: string; localidade: string; uf: string; logradouro: string; bairro: string } | { ok: false; message: string }> {
  const digits = cepRaw.replace(/\D/g, "");
  if (digits.length !== 8) {
    return { ok: false, message: "CEP deve ter 8 dígitos." };
  }
  const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
  if (!res.ok) {
    return { ok: false, message: "Não foi possível consultar o CEP." };
  }
  const j = (await res.json()) as { erro?: boolean; localidade?: string; uf?: string; logradouro?: string; bairro?: string };
  if (j.erro) {
    return { ok: false, message: "CEP não encontrado." };
  }
  return {
    ok: true,
    cep: digits.replace(/(\d{5})(\d{3})/, "$1-$2"),
    localidade: j.localidade ?? "",
    uf: j.uf ?? "",
    logradouro: j.logradouro ?? "",
    bairro: j.bairro ?? "",
  };
}
