export type CookieConsent = {
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = "cookie-consent";

export function getConsent(): CookieConsent | null {
  const stored = localStorage.getItem(CONSENT_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as CookieConsent;
  } catch {
    return null;
  }
}

export function setConsent(consent: CookieConsent): void {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
}

export function hasConsent(): boolean {
  return getConsent() !== null;
}