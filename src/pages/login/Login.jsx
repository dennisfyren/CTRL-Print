import React, { useState } from "react";
import Button from "../../components/Button";
import logo from "../../assets/logoPNG.png";
import TextInput from "../../components/TextInput";
import { CircleX, X } from "lucide-react";

function Login({ onLogin, resetApp }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  async function handleSubmit(e) {
    const success = await onLogin(password);
    if (!success) setError("Fel lösenord");
    setTimeout(() => {
      setError("");
    }, 1500);
    setPassword("");
  }

  function handleOpen() {
    setOpen((prev) => !prev);
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen animate-fade-in">
      <img
        src={logo}
        className="w-64 sm:w-80 md:w-90 shadow p-12 rounded-2xl bg-main-orange mb-16"
        alt="logo"
      ></img>
      <div className="flex rounded gap-4 justify-center relative">
        {error && (
          <h1 className="text-red-400 mt-7 justify-self-center absolute left-0 -top-16 animate-fade-in">
            {error}
          </h1>
        )}
        <div
          className={`flex flex-col md:flex-row gap-6 relative items-center md:items-start`}
        >
          {!open && (
            <div className={`${error && "animate-bounces"}`}>
              <TextInput
                label={"Ange lösenord"}
                className="dark:text-main-text"
                handleChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
          )}
          {open && (
            <div className="flex flex-col items-center gap-6 p-2 w-80 sm:w-130 bg-red-900 border border-red-500 rounded dark:text-main-text">
              <X
                className="absolute right-3 cursor-pointer"
                size={24}
                onClick={() => handleOpen()}
              />
              <p className="mt-4 mx-4">
                VARNING! Detta kommer att radera all data.
              </p>
              <Button
                label={"Återställ app"}
                className="bg-red-500 hover:bg-red-600 h-10 w-40"
                handleClick={() => resetApp()}
              />
            </div>
          )}
          {!open && (
            <div className="flex flex-col gap-4 items-end">
              <Button
                label={"Logga in"}
                className="bg-blue-500 hover:bg-blue-600 h-10 w-40"
                handleClick={(e) => handleSubmit(e)}
              />
            </div>
          )}
        </div>
      </div>
      <p className="dark:text-main-text mt-4 mx-4 cursor-default">
        Problem med att logga in?{" "}
        <span
          className="italic cursor-pointer text-sm"
          onClick={() => handleOpen()}
        >
          Klicka här för att återställa app.
        </span>
      </p>
    </div>
  );
}

export default Login;
