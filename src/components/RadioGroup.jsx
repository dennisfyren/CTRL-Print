import React from "react";

function RadioGroup({ label, name, extra, options, value = "", handleChange }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <h1 className="text-xl mb-2">
        {label}
        {extra && <span className="italic"> ({extra})</span>}
      </h1>
      {options?.map((option) => (
        <div key={option} className="flex items-center gap-2 ml-4">
          <input
            className="peer sr-only"
            id={option}
            type="radio"
            name={label}
            value={option}
            checked={value === option}
            onChange={(e) => {
              handleChange({ [name]: { label, values: [e.target.value] } });
            }}
          />
          <label
            htmlFor={option}
            className="mb-1
              w-6 h-6
              border-2 border-gray-400
              rounded-md
              cursor-pointer
              peer-checked:bg-main-orange
              peer-checked:border-main-orange
  "
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
}

export default RadioGroup;
