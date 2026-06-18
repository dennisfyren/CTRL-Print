import React, { useState } from "react";
import Button from "../../components/Button";
import logo from "../../assets/logoPNG.png";
import TextInput from "../../components/TextInput";

function Login({ onLogin, resetApp }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");
    const success = await onLogin(password);
    if (!success) setError("Fel lösenord");
    setPassword("");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen animate-fade-in">
      <img
        src={logo}
        className="w-90 shadow p-12 rounded-2xl bg-main-orange mb-16"
        alt="logo"
      ></img>
      <div className="flex rounded gap-4 justify-center">
        <div className="flex gap-6 relative items-start">
          <div>
            <TextInput
              label={"Ange lösenord"}
              className="dark:text-main-text "
              handleChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            {error && (
              <h1 className="text-red-400 mt-7 justify-self-center">{error}</h1>
            )}
          </div>
          <div className="flex flex-col gap-4 items-end">
            <Button
              label={"Logga in"}
              className="bg-blue-500 hover:bg-blue-600 h-10 w-40"
              handleClick={handleSubmit}
            />
            <Button
              label={"Återställ app"}
              className="bg-red-500 hover:bg-red-600 h-10 w-40"
              handleClick={() => resetApp()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
