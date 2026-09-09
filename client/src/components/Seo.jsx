import { Helmet } from "react-helmet-async";
import { useLang } from "../context/LanguageContext";

const SITE_URL = "https://fabyservices.com";

/**
 * Per-page <head> metadata, managed at runtime.
 *
 * Owns only the tags that benefit from being per-page and that JS-aware
 * consumers (the browser tab and Googlebot, which renders JS) read: the
 * document title, meta description, canonical URL, and the <html lang> hint.
 *
 * Open Graph / Twitter tags are intentionally NOT set here. Social scrapers
 * (Facebook, WhatsApp, iMessage, X) do not run JS, so per-page social tags
 * would never be seen; those live as a static, site-level baseline in
 * index.html instead. Keeping them out of here also avoids duplicate,
 * conflicting tags in the live DOM.
 *
 * The site serves English and Spanish from the same URL (client-side toggle),
 * so the canonical URL is language-agnostic and <html lang> follows the active
 * language.
 *
 * @param {string}  title         Page title (already translated by the caller).
 * @param {string}  [description] Meta description (already translated).
 * @param {string}  [path]        Path portion of the canonical URL, e.g. "/services".
 * @param {boolean} [noindex]     When true, ask crawlers not to index the page.
 */
export default function Seo({ title, description, path = "", noindex = false }) {
  const { lang } = useLang();
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
}
