import React, { useState } from "react";

function CheckboxGroup({ label, name, extra, options, handleChange }) {
  const [selected, setSelected] = useState([]);

  function handleCheck(option) {
    const updated = selected.includes(option)
      ? selected.filter((o) => o !== option)
      : [...selected, option];

    setSelected(updated);

    if (updated.length === 0) {
      handleChange({ [name]: null });
    } else {
      handleChange({ [name]: { label, values: updated } });
    }
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <h1 className="text-xl mb-2">
        {label}
        {extra && <span className="italic"> ({extra})</span>}
      </h1>
      {options.map((option) => (
        <div key={option} className="flex items-center gap-2 ml-6">
          <input
            id={option}
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => handleCheck(option)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
}

export default CheckboxGroup;
