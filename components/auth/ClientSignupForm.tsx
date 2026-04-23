"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase/browser";

function onlyDigits(s: string) {
  return s.replace(/\D/g, "");
}

export default function ClientSignupForm() {
  const router = useRouter();
  const [pj, setPj] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  /* Pessoa física */
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [phoneCell, setPhoneCell] = useState("");
  const [phoneSecondary, setPhoneSecondary] = useState("");

  /* Pessoa jurídica */
  const [cnpj, setCnpj] = useState("");
  const [hasStateReg, setHasStateReg] = useState<"sim" | "nao" | "">("");
  const [stateRegistration, setStateRegistration] = useState("");
  const [companyLegalName, setCompanyLegalName] = useState("");
  const [tradeName, setTradeName] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const supabase = getBrowserSupabase();
    if (!supabase) {
      setError("Supabase não configurado.");
      return;
    }

    if (!pj) {
      if (!fullName.trim()) {
        setError("Informe o nome completo.");
        return;
      }
      const cpfDigits = onlyDigits(cpf);
      if (cpfDigits.length !== 11) {
        setError("CPF inválido (use 11 dígitos).");
        return;
      }
      if (!birthDate) {
        setError("Informe a data de nascimento.");
        return;
      }
      if (!gender) {
        setError("Selecione o sexo.");
        return;
      }
      const cell = onlyDigits(phoneCell);
      if (cell.length < 10) {
        setError("Informe um telefone celular válido.");
        return;
      }
    } else {
      const cnpjDigits = onlyDigits(cnpj);
      if (cnpjDigits.length !== 14) {
        setError("CNPJ inválido (use 14 dígitos).");
        return;
      }
      if (!hasStateReg) {
        setError("Indique se possui inscrição estadual.");
        return;
      }
      if (!companyLegalName.trim()) {
        setError("Informe a razão social.");
        return;
      }
      if (!tradeName.trim()) {
        setError("Informe o nome fantasia.");
        return;
      }
      const cph = onlyDigits(contactPhone);
      if (cph.length < 10) {
        setError("Informe um número para contato válido.");
        return;
      }
    }

    setLoading(true);
    const origin = window.location.origin;

    const data: Record<string, string | boolean> = {
      account_type: pj ? "pj" : "pf",
      newsletter,
    };

    if (!pj) {
      data.full_name = fullName.trim();
      data.cpf = onlyDigits(cpf);
      data.birth_date = birthDate;
      data.gender = gender;
      data.phone_cell = onlyDigits(phoneCell);
      data.phone_secondary = onlyDigits(phoneSecondary);
    } else {
      data.full_name = companyLegalName.trim();
      data.cnpj = onlyDigits(cnpj);
      data.company_legal_name = companyLegalName.trim();
      data.company_trade_name = tradeName.trim();
      data.has_state_registration = hasStateReg === "sim";
      data.state_registration = hasStateReg === "sim" ? stateRegistration.trim() : "";
      data.contact_phone = onlyDigits(contactPhone);
    }

    const { data: signData, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback?next=/`,
        data,
      },
    });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    if (signData.user && !signData.session) {
      router.push("/login?pending=confirm-email");
      router.refresh();
      return;
    }
    router.push("/login?registered=1");
    router.refresh();
  };

  return (
    <form className="auth-form auth-form--signup" onSubmit={(e) => void onSubmit(e)}>
      {error && <p className="auth-error" role="alert">{error}</p>}

      <div className="auth-form-toggle-row">
        <button
          type="button"
          className="auth-mini-toggle"
          onClick={() => {
            setPj((v) => !v);
            setError(null);
          }}
        >
          {pj ? "Inserir dados como pessoa física" : "Inserir dados como pessoa jurídica"}
        </button>
      </div>

      {!pj ? (
        <>
          <label className="auth-label">
            Nome completo
            <input className="auth-input" value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" required />
          </label>
          <label className="auth-label">
            Seu e-mail
            <input className="auth-input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="auth-label">
            CPF
            <input className="auth-input" inputMode="numeric" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="000.000.000-00" required />
          </label>
          <label className="auth-label">
            Data de nascimento
            <input className="auth-input" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
          </label>
          <label className="auth-label">
            Sexo
            <select className="auth-input" value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Selecione…</option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
              <option value="outro">Outro</option>
              <option value="prefiro_nao_informar">Prefiro não informar</option>
            </select>
          </label>
          <label className="auth-label">
            Telefone celular
            <input className="auth-input" type="tel" autoComplete="tel-national" value={phoneCell} onChange={(e) => setPhoneCell(e.target.value)} required />
          </label>
          <label className="auth-label">
            Telefone secundário <span className="auth-optional">(opcional)</span>
            <input className="auth-input" type="tel" value={phoneSecondary} onChange={(e) => setPhoneSecondary(e.target.value)} />
          </label>
        </>
      ) : (
        <>
          <label className="auth-label">
            Seu e-mail
            <input className="auth-input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="auth-label">
            CNPJ
            <input className="auth-input" inputMode="numeric" value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="00.000.000/0000-00" required />
          </label>
          <fieldset className="auth-fieldset">
            <legend className="auth-legend">Possui inscrição estadual?</legend>
            <label className="auth-inline-check">
              <input type="radio" name="ie" checked={hasStateReg === "sim"} onChange={() => setHasStateReg("sim")} /> Sim
            </label>
            <label className="auth-inline-check">
              <input type="radio" name="ie" checked={hasStateReg === "nao"} onChange={() => setHasStateReg("nao")} /> Não
            </label>
          </fieldset>
          {hasStateReg === "sim" && (
            <label className="auth-label">
              Número da inscrição estadual
              <input className="auth-input" value={stateRegistration} onChange={(e) => setStateRegistration(e.target.value)} />
            </label>
          )}
          <label className="auth-label">
            Razão social
            <input className="auth-input" value={companyLegalName} onChange={(e) => setCompanyLegalName(e.target.value)} required />
          </label>
          <label className="auth-label">
            Nome fantasia
            <input className="auth-input" value={tradeName} onChange={(e) => setTradeName(e.target.value)} required />
          </label>
          <label className="auth-label">
            Número para contato
            <input className="auth-input" type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} required />
          </label>
        </>
      )}

      <label className="auth-label">
        Senha
        <input className="auth-input" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required />
      </label>
      <label className="auth-label">
        Confirmar senha
        <input
          className="auth-input"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength={6}
          required
        />
      </label>

      <label className="auth-label auth-label--checkbox">
        <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
        Receber novidades por e-mail
      </label>

      <button className="btn-dark auth-submit" type="submit" disabled={loading}>
        {loading ? "Criando…" : "Criar conta"}
      </button>
      <p className="auth-muted">
        Já tem conta? <Link href="/login">Entrar</Link>
      </p>
    </form>
  );
}
