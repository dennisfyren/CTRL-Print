import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import { useDarkMode } from "./hooks/useDarkMode";
import { useAuth } from "./hooks/useAuth";
import CreatePassword from "./pages/login/CreatePassword";
import Login from "./pages/login/Login";

function App() {
  const [isDark, setIsDark] = useDarkMode();

  const { authed, isSetup, setPassword, login, logout, resetApp } = useAuth();

  if (!authed && !isSetup) return <CreatePassword onSet={setPassword} />;
  if (!authed && isSetup) return <Login onLogin={login} resetApp={resetApp} />;

  return (
    <div className="">
      <Dashboard
        isDark={isDark}
        setIsDark={setIsDark}
        logout={logout}
        onSet={setPassword}
      />
    </div>
  );
}

export default App;
