import React, { useState } from "react";

function TextInput({
  label,
  placeholder,
  type = "text",
  className = "",
  id,
  handleChange,
  handleBlur,
  value,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || value?.length > 0;

  return (
    <div className="flex gap-2 items-center relative transition-colors duration-500 ease-in-out">
      <p
        className={`${
          isFloating
            ? "text-main-dark-gray z-20 translate-y-[-1.15rem] text-xs"
            : "text-main-gray text-sm"
        } absolute left-2 bg-main-bg dark:bg-main-bg-dark dark:text-white transition-all duration-200 px-1 pointer-events-none`}
      >
        {label}
      </p>
      <input
        className={`${className} z-10 border border-main-gray dark:border-gray-400 rounded px-2 h-10 w-80 invalid:border-red-500 invalid:border-2 `}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          handleBlur && handleBlur();
        }}
        id={id}
      />
    </div>
  );
}

export default TextInput;
