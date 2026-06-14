import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import { useDarkMode } from "./hooks/useDarkMode";

function App() {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <div className="">
      <Dashboard isDark={isDark} setIsDark={setIsDark} />
    </div>
  );
}

export default App;
