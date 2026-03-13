import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

// ════════════════════════════════════════════
// 15 LIGHT MODE + 15 DARK MODE chart colors
// ════════════════════════════════════════════

const CHART_COLORS = {
  light: {
    brand600: "#4f46e5",
    brand700: "#4338ca",
    brand100: "#e0e7ff",

    blue600: "#2563eb",
    blue100: "#dbeafe",
    blue700: "#1d4ed8",

    green600: "#16a34a",
    green100: "#dcfce7",
    green700: "#15803d",

    yellow600: "#ca8a04",
    yellow100: "#fef9c3",
    yellow700: "#a16207",

    orange600: "#ea580c",
    orange100: "#fff7ed",

    red600: "#dc2626",
    red100: "#fee2e2",

    indigo600: "#4f46e5",
    indigo100: "#e0e7ff",
    indigo700: "#4338ca",

    // Chart specific
    text: "#374151",
    textMuted: "#6b7280",
    gridLine: "#e5e7eb",
    tooltipBg: "#ffffff",
    tooltipBorder: "#e5e7eb",
    cardBg: "#ffffff",

    // Pie / status
    statusUnconfirmed: "#f59e0b",
    statusConfirmed: "#3b82f6",
    statusDelivering: "#f97316",
    statusDelivered: "#22c55e",

    // Top products gradient
    progressTrack: "#f3f4f6",
    progressBar: "#4f46e5",

    // Area fill
    areaFill: "rgba(79, 70, 229, 0.15)",
  },
  dark: {
    brand600: "#818cf8",
    brand700: "#6366f1",
    brand100: "#312e81",

    blue600: "#60a5fa",
    blue100: "#1e3a5f",
    blue700: "#3b82f6",

    green600: "#4ade80",
    green100: "#14532d",
    green700: "#22c55e",

    yellow600: "#facc15",
    yellow100: "#422006",
    yellow700: "#eab308",

    orange600: "#fb923c",
    orange100: "#431407",

    red600: "#f87171",
    red100: "#450a0a",

    indigo600: "#818cf8",
    indigo100: "#312e81",
    indigo700: "#6366f1",

    // Chart specific
    text: "#e5e7eb",
    textMuted: "#9ca3af",
    gridLine: "#374151",
    tooltipBg: "#1f2937",
    tooltipBorder: "#374151",
    cardBg: "#111827",

    // Pie / status
    statusUnconfirmed: "#fbbf24",
    statusConfirmed: "#60a5fa",
    statusDelivering: "#fb923c",
    statusDelivered: "#4ade80",

    // Top products gradient
    progressTrack: "#1f2937",
    progressBar: "#818cf8",

    // Area fill
    areaFill: "rgba(129, 140, 248, 0.2)",
  },
};

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode",
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  const chartColors = isDarkMode ? CHART_COLORS.dark : CHART_COLORS.light;

  return (
    <DarkModeContext.Provider
      value={{ isDarkMode, toggleDarkMode, chartColors }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };
