const DEFAULT_NUMBER = "5582987329774";

function normalizeWhatsAppNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits;
}

export function getWhatsAppNumber(): string {
  const fromEnv = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").trim();
  const normalized = fromEnv ? normalizeWhatsAppNumber(fromEnv) : "";
  return normalized || DEFAULT_NUMBER;
}

export function getWhatsAppBaseUrl(): string {
  return `https://wa.me/${getWhatsAppNumber()}`;
}

export function buildWhatsAppHref(message?: string): string {
  const base = getWhatsAppBaseUrl();
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

