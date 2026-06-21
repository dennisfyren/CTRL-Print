import React, { useRef, useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { ImageUp, Trash } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

function Settings({ userSettings, setUserSettings, onSet }) {
  const MAX_SIZE = 80 * 1024;
  const logoInputRef = useRef(null);
  const [saved, setSaved] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { id, value } = e.target;
    setUserSettings((prev) => ({ ...prev, [id]: value }));
  }
  function handleBlur(e) {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleSubmit() {
    setError("");
    setSuccess("");
    if (password !== confirm) return setError("Lösenord matchar inte");
    await onSet(password).then(setPassword("")).then(setConfirm(""));
    setSuccess("Lösenord ändrat");
    setTimeout(() => {
      setSuccess("");
    }, 2000);
  }

  function clearData() {
    setUserSettings((prev) =>
      Object.fromEntries(Object.keys(prev).map((key) => [key, ""])),
    );
    if (logoInputRef.current) logoInputRef.current.value = "";
    handleBlur();
  }

  function handleLogoChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Endast bilder är tillåtet.");
      return;
    }

    if (file.size > MAX_SIZE) {
      alert(
        `Filen är för stor. Din fil är ${(file.size / 1024).toFixed(2)}KB. Max filstorlek är ${MAX_SIZE / 1024}KB.`,
      );
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUserSettings((prev) => ({ ...prev, logo: e.target.result }));
    };
    reader.readAsDataURL(file);
  }
  return (
    <div className="flex animate-fade-in">
      <div className="flex flex-col gap-4 p-10 w-auto dark:text-white">
        <h1 className="text-2xl font-semibold dark:text-white">
          Inställningar
        </h1>
        <TextInput
          label="Namn"
          id="name"
          value={userSettings.name}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <TextInput
          label="Företag"
          id="company"
          value={userSettings.company}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <TextInput
          label="Adress"
          id="address"
          value={userSettings.address}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <TextInput
          label="Postnummer"
          id="postalCode"
          value={userSettings.postalCode}
          handleChange={handleChange}
          handleBlur={handleBlur}
          type="number"
        />
        <TextInput
          label="Ort"
          id="city"
          value={userSettings.city}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <TextInput
          label="Hemsida"
          id="website"
          value={userSettings.website}
          handleChange={handleChange}
          handleBlur={handleBlur}
          type="text"
        />
        <TextInput
          label="E-post"
          id="email"
          value={userSettings.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
          type="email"
        />
        <TextInput
          label="Telefon"
          id="phone"
          value={userSettings.phone}
          handleChange={handleChange}
          handleBlur={handleBlur}
          type="tel"
        />
      </div>
      <div className="flex flex-col gap-4 p-10 mt-10">
        {userSettings.logo ? (
          <img
            className="rounded-lg my-4"
            src={userSettings.logo}
            alt="Logo"
            width="200"
          />
        ) : (
          <p className="dark:text-white">Ingen bild uppladdad.</p>
        )}

        <input
          ref={logoInputRef}
          className="hidden"
          type="file"
          id="logo"
          accept="image/*"
          onChange={handleLogoChange}
        />
        <div className="flex flex-col gap-4 w-50">
          <label
            htmlFor="logo"
            className="relative bg-green-600 hover:bg-green-700 rounded px-4 py-2 w-full text-main-bg text-sm font-semibold text-center"
          >
            <ImageUp className="absolute left-2 self-center" size={26} /> Ladda
            upp logo
          </label>
          <Button
            Logo={Trash}
            logoSize={26}
            label="Rensa all data"
            handleClick={clearData}
            className="col-span-2 w-full bg-red-500 hover:bg-red-700"
          />
        </div>
        <p
          className={`text-green-700 transition-opacity duration-300 ${saved ? "opacity-100" : "opacity-0"}`}
        >
          Sparade!
        </p>
        <div className="flex flex-col gap-2">
          <div className="relative flex flex-col gap-2">
            <TextInput
              label={"Skriv nytt lösenord"}
              className="dark:text-main-text"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              type="password"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <TextInput
              label={"Upprepa nytt lösenord"}
              className="dark:text-main-text"
              value={confirm}
              handleChange={(e) => setConfirm(e.target.value)}
              type="password"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            {error && (
              <p className="text-red-500 absolute -bottom-7 animate-fade-in">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-500 absolute -bottom-7 animate-fade-in">
                {success}
              </p>
            )}
          </div>
          <Button
            label={"Ändra lösenord"}
            className="mt-8 bg-blue-500 hover:bg-blue-600 w-50"
            handleClick={(e) => handleSubmit()}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
