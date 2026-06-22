import { createContext, useContext, useState } from "react";
import Dashboard from "./pages/Dashboard";
import { useDarkMode } from "./hooks/useDarkMode";
import { useAuth } from "./hooks/useAuth";
import CreatePassword from "./pages/login/CreatePassword";
import Login from "./pages/login/Login";
import { DataProvider } from "./hooks/DataContext";

function App() {
  const [isDark, setIsDark] = useDarkMode();
  const { authed, isSetup, setPassword, login, logout, resetApp } = useAuth();

  if (!authed && !isSetup) return <CreatePassword onSet={setPassword} />;
  if (!authed && isSetup) return <Login onLogin={login} resetApp={resetApp} />;

  return (
    <DataProvider>
      <Dashboard
        isDark={isDark}
        setIsDark={setIsDark}
        logout={logout}
        onSet={setPassword}
      />
    </DataProvider>
  );
}

export default App;
