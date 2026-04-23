"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminUpdateShopInformacoes } from "@/app/actions/admin";
import type { ShopInformacoesInput } from "@/app/actions/admin";
import type { ShopSettingsRow } from "@/types/admin";

export default function AdminInformacoesLojaClient({ initial }: { initial: ShopSettingsRow }) {
  const router = useRouter();
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [storeLegalName, setStoreLegalName] = useState(initial.store_legal_name);
  const [storeTradeName, setStoreTradeName] = useState(initial.store_trade_name);
  const [storeEmail, setStoreEmail] = useState(initial.store_email);
  const [storePhone, setStorePhone] = useState(initial.store_phone);
  const [storeCep, setStoreCep] = useState(initial.store_cep);
  const [storeLogradouro, setStoreLogradouro] = useState(initial.store_logradouro);
  const [storeNumero, setStoreNumero] = useState(initial.store_numero);
  const [storeComplemento, setStoreComplemento] = useState(initial.store_complemento);
  const [storeBairro, setStoreBairro] = useState(initial.store_bairro);
  const [storeCidade, setStoreCidade] = useState(initial.store_cidade);
  const [storeUf, setStoreUf] = useState(initial.store_uf);

  const [correiosCodigo, setCorreiosCodigo] = useState(initial.correios_codigo_servico);
  const [correiosCnpj, setCorreiosCnpj] = useState(initial.correios_cnpj_contrato);
  const [correiosCartao, setCorreiosCartao] = useState(initial.correios_numero_cartao);
  const [correiosAmbiente, setCorreiosAmbiente] = useState<"homologacao" | "producao">(initial.correios_ambiente);

  const [seoTitle, setSeoTitle] = useState(initial.seo_title);
  const [seoDescription, setSeoDescription] = useState(initial.seo_description);
  const [seoKeywords, setSeoKeywords] = useState(initial.seo_keywords);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const payload: ShopInformacoesInput = {
        store_legal_name: storeLegalName,
        store_trade_name: storeTradeName,
        store_email: storeEmail,
        store_phone: storePhone,
        store_cep: storeCep,
        store_logradouro: storeLogradouro,
        store_numero: storeNumero,
        store_complemento: storeComplemento,
        store_bairro: storeBairro,
        store_cidade: storeCidade,
        store_uf: storeUf,
        correios_codigo_servico: correiosCodigo,
        correios_cnpj_contrato: correiosCnpj,
        correios_numero_cartao: correiosCartao,
        correios_ambiente: correiosAmbiente,
        seo_title: seoTitle,
        seo_description: seoDescription,
        seo_keywords: seoKeywords,
      };
      await adminUpdateShopInformacoes(payload);
      router.refresh();
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Erro ao guardar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="admin-form-grid" onSubmit={(e) => void onSubmit(e)}>
      {err && (
        <p className="auth-error admin-form-span2" role="alert">
          {err}
        </p>
      )}

      <h2 className="admin-shop-section-title admin-form-span2">Dados da loja</h2>
      <label className="auth-label admin-form-span2">
        Razão social
        <input className="auth-input" value={storeLegalName} onChange={(e) => setStoreLegalName(e.target.value)} />
      </label>
      <label className="auth-label admin-form-span2">
        Nome fantasia
        <input className="auth-input" value={storeTradeName} onChange={(e) => setStoreTradeName(e.target.value)} />
      </label>
      <label className="auth-label">
        E-mail da loja
        <input className="auth-input" type="email" value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} />
      </label>
      <label className="auth-label">
        Telefone
        <input className="auth-input" value={storePhone} onChange={(e) => setStorePhone(e.target.value)} />
      </label>
      <label className="auth-label">
        CEP
        <input className="auth-input" value={storeCep} onChange={(e) => setStoreCep(e.target.value)} placeholder="00000000" />
      </label>
      <label className="auth-label">
        UF
        <input className="auth-input" maxLength={2} value={storeUf} onChange={(e) => setStoreUf(e.target.value.toUpperCase())} />
      </label>
      <label className="auth-label admin-form-span2">
        Logradouro
        <input className="auth-input" value={storeLogradouro} onChange={(e) => setStoreLogradouro(e.target.value)} />
      </label>
      <label className="auth-label">
        Número
        <input className="auth-input" value={storeNumero} onChange={(e) => setStoreNumero(e.target.value)} />
      </label>
      <label className="auth-label">
        Complemento
        <input className="auth-input" value={storeComplemento} onChange={(e) => setStoreComplemento(e.target.value)} />
      </label>
      <label className="auth-label">
        Bairro
        <input className="auth-input" value={storeBairro} onChange={(e) => setStoreBairro(e.target.value)} />
      </label>
      <label className="auth-label">
        Cidade
        <input className="auth-input" value={storeCidade} onChange={(e) => setStoreCidade(e.target.value)} />
      </label>

      <h2 className="admin-shop-section-title admin-form-span2">Correios (pré-configuração)</h2>
      <label className="auth-label">
        Código do serviço
        <input className="auth-input" value={correiosCodigo} onChange={(e) => setCorreiosCodigo(e.target.value)} placeholder="Ex.: PAC, SEDEX…" />
      </label>
      <label className="auth-label">
        Ambiente
        <select className="auth-input" value={correiosAmbiente} onChange={(e) => setCorreiosAmbiente(e.target.value as "homologacao" | "producao")}>
          <option value="homologacao">Homologação</option>
          <option value="producao">Produção</option>
        </select>
      </label>
      <label className="auth-label">
        CNPJ do contrato (só dígitos)
        <input className="auth-input" value={correiosCnpj} onChange={(e) => setCorreiosCnpj(e.target.value)} />
      </label>
      <label className="auth-label">
        Número do cartão de postagem
        <input className="auth-input" value={correiosCartao} onChange={(e) => setCorreiosCartao(e.target.value)} />
      </label>

      <h2 className="admin-shop-section-title admin-form-span2">SEO (site público)</h2>
      <label className="auth-label admin-form-span2">
        Título (meta title)
        <input className="auth-input" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="Vazio = título padrão C2 Aditivos" />
      </label>
      <label className="auth-label admin-form-span2">
        Meta description
        <textarea className="auth-input" rows={3} value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} />
      </label>
      <label className="auth-label admin-form-span2">
        Palavras-chave (separadas por vírgula)
        <input className="auth-input" value={seoKeywords} onChange={(e) => setSeoKeywords(e.target.value)} />
      </label>

      <div className="admin-form-actions admin-form-span2">
        <button type="submit" className="btn-dark" disabled={loading}>
          {loading ? "A guardar…" : "Guardar informações da loja"}
        </button>
      </div>
    </form>
  );
}
