import React from "react";
import TextInput from "../components/TextInput";

function Settings({ userSettings, setUserSettings }) {
  return (
    <div className="flex flex-col gap-4 p-5">
      <h1>Inställningar</h1>
      <TextInput label="Namn" value={userSettings.name} />
    </div>
  );
}

export default Settings;
