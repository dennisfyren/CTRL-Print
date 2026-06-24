import React, { useState, useEffect } from "react";

function TextInput({
  label,
  extra,
  placeholder,
  type = "text",
  className = "",
  id,
  handleChange,
  handleDataChange = null,
  handleBlur,
  value: externalValue,
  onKeyDown,
  defaultValue = "",
  Logo = undefined,
  name,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const value = externalValue ?? internalValue;
  const isFloating = isFocused || value?.length > 0 || type === "date";

  useEffect(() => {
    if (defaultValue) {
      handleDataChange?.({ [name ?? label]: { [label]: defaultValue } });
    }
  }, []);

  return (
    <div className="flex gap-2 items-center relative transition-colors duration-500 ease-in-out">
      <p
        className={`${isFloating ? "text-main-dark-gray z-20 translate-y-[-1.15rem] text-xs" : "text-main-gray text-sm"} absolute left-2 bg-main-bg dark:bg-main-bg-dark dark:text-white transition-all duration-200 px-1 pointer-events-none`}
      >
        {label}
        {extra && <span className="italic"> ({extra})</span>}
      </p>
      <input
        name={name}
        className={`${className} z-10 border border-main-gray dark:border-gray-400 rounded px-2 h-10 w-80 invalid:border-red-500 invalid:border-2`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          setInternalValue(val);
          handleChange?.(e);
          if (val === "") {
            handleDataChange?.({ [name]: null });
          } else {
            handleDataChange?.({ [name]: { [label]: val } });
          }
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          handleBlur?.();
        }}
        id={id}
        onKeyDown={onKeyDown}
      />

      {Logo && <Logo className="absolute left-72" />}
    </div>
  );
}

export default TextInput;
