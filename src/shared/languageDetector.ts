/**
 * Detecta el idioma del navegador/sistema y normaliza a los locales usados
 * Retorna 'es-MX' si el idioma detectado es español, de lo contrario 'en-GB'.
 * Nota: funciona en el cliente (usa `navigator`). En entorno servidor devuelve 'en-GB'.
 */
export function detectLanguage(): 'es-MX' | 'en-GB' {
  try {
    if (typeof navigator === 'undefined') return 'en-GB';

    const navLang = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    if (!navLang) return 'en-GB';

    // Si comienza con 'es' (es, es-ES, es-MX, etc.) lo consideramos español
    if (/^es(-|$)/i.test(navLang)) return 'es-MX';

    return 'en-GB';
  } catch (e) {
    return 'en-GB';
  }
}

export default detectLanguage;
