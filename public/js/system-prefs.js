// Detect system language and theme, apply them, and expose as window.__systemPrefs
;(function () {
  try {
    var storedLang = localStorage.getItem('lang');
    var navLang = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
    var lang = storedLang || (navLang && navLang.toLowerCase().startsWith('es') ? 'es-MX' : 'en-GB');

    var storedTheme = localStorage.getItem('theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = 'light';
    if (storedTheme === 'dark') theme = 'dark';
    else if (storedTheme === 'light') theme = 'light';
    else theme = prefersDark ? 'dark' : 'light';

    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');

    // set language attribute on <html>
    try {
      document.documentElement.lang = lang && lang.startsWith('es') ? 'es' : 'en';
    } catch (e) {}

    // expose
    window.__systemPrefs = { lang: lang, theme: theme };

    // Dispatch an event so client components can react
    try {
      window.dispatchEvent(new CustomEvent('system-preferences', { detail: window.__systemPrefs }));
    } catch (e) {}

    // If on root path, redirect to detected language home
    var path = location.pathname || '/';
    var hasPrefix = path.startsWith('/es-MX') || path.startsWith('/en-GB');
    if ((path === '/' || path === '') && !hasPrefix) {
      var target = '/' + lang + '/';
      // use replace so back doesn't keep the blank page
      location.replace(target);
    }
  } catch (e) {
    // ignore
  }
})();
