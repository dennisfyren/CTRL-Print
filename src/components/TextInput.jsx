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
  unit = "",
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(
    () => externalValue ?? defaultValue,
  );

  const value = externalValue ?? internalValue;
  const isFloating = isFocused || value?.length > 0 || type === "date";

  useEffect(() => {
    if (externalValue === undefined) {
      setInternalValue(defaultValue ?? "");
    }
  }, [defaultValue, externalValue]);
  useEffect(() => {
    if (externalValue === undefined && defaultValue) {
      handleDataChange?.({ [name ?? label]: { [label]: defaultValue } });
    }
  }, [defaultValue, externalValue, handleDataChange, name, label]);

  return (
    <div className="flex gap-2 items-center relative transition-colors duration-500 ease-in-out ml-1 sm:ml-0">
      <p
        className={`${isFloating ? " dark:text-main-text z-20 translate-y-[-1.45rem] text-xs border rounded-xl bg-gray-100 dark:bg-gray-700 px-3" : "text-main-gray text-sm"} absolute left-2 dark:text-white duration-150 px-1 pointer-events-none`}
      >
        {label}
        {extra && <span className="italic"> ({extra})</span>}
      </p>
      <input
        name={name}
        className={`${className} z-10 border border-main-gray dark:border-gray-400 rounded px-2 h-12 pt-2 w-56 sm:w-80 invalid:border-red-500 invalid:border-2`}
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

      {Logo && <Logo className="absolute left-48 sm:left-72" />}
    </div>
  );
}

export default TextInput;
