import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const getSystemPref = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export function useDarkMode() {
  const [theme, setTheme] = useLocalStorage("theme", getSystemPref());
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      if (localStorage.getItem("theme") === null)
        setTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return [isDark, (val) => setTheme(val ? "dark" : "light")];
}
