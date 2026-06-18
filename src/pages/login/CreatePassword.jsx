import React, { useState } from "react";
import TextInput from "../../components/TextInput";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/Button";
import logo from "../../assets/logoPNG.png";

function CreatePassword({ onSet }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  async function handleClick() {
    if (password !== confirm) return setError("Lösenord matchar inte");
    setError("");
    await onSet(password);
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10 bg-main-bg">
      <img
        src={logo}
        className="w-90 dark:bg-main-bg-dark bg-main-inactive p-12 rounded-2xl"
        alt="logo"
      ></img>
      <div className="flex h-32 rounded gap-4 justify-center">
        <div className="flex flex-col gap-3 relative">
          <h1 className="dark:text-main-text">Ange ett nytt lösenord</h1>
          <TextInput
            label={"Ange lösenord"}
            className="dark:text-main-text"
            handleChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
          />
          <TextInput
            label={"Upprepa lösenord"}
            className="dark:text-main-text"
            handleChange={(e) => setConfirm(e.target.value)}
            value={confirm}
            type="password"
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
          />
          {error && (
            <h1 className="text-red-400 absolute -bottom-10">{error}</h1>
          )}
        </div>
        <Button
          label={"Save"}
          className="bg-blue-500 hover:bg-blue-600 w-25 h-28 self-end"
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}

export default CreatePassword;
