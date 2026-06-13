import React, { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function TextInput({ label, placeholder, type = "text", className = "" }) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const isFloating = isFocused || value.length > 0;

  return (
    <div className="flex gap-2 items-center relative">
      <p
        className={`${
          isFloating
            ? "text-main-dark-gray z-20 translate-y-[-1.15rem] text-xs"
            : "text-main-gray text-sm"
        } absolute left-2 bg-main-bg transition-all duration-200 px-1 pointer-events-none`}
      >
        {label}
      </p>
      <input
        className={`${className} z-10 border border-main-gray rounded px-2 h-8`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setUserSettings((prev) => ({
            ...prev,
            [label]: e.target.value,
          }));
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}

export default TextInput;
