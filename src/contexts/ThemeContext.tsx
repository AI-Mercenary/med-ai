import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ThemeName = "sky" | "green" | "blue";

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  themeLabel: string;
}

const labels: Record<ThemeName, string> = {
  sky: "Sky Blue",
  green: "Green",
  blue: "Blue",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("medai-theme") as ThemeName) || "sky";
    }
    return "sky";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("medai-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeLabel: labels[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
