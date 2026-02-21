;(function () {
        try {
          var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
          var stored = localStorage.getItem("theme");
          if (stored === "dark" || (!stored && prefersDark)) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        } catch (e) {
          // ignore
        }
      })();