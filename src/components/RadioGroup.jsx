import React, { useState } from "react";

function RadioGroup({ label, options }) {
  const [selected, setSelected] = useState("");

  return (
    <div className="flex flex-col items-start gap-1">
      <h1 className="text-xl mb-2">{label}</h1>
      {options.map((option) => (
        <div key={option} className="flex items-center gap-2 ml-6">
          <input
            type="radio"
            name={label}
            value={option}
            checked={selected === option}
            onChange={(e) => setSelected(e.target.value)}
          />
          <label>{option}</label>
        </div>
      ))}
    </div>
  );
}

export default RadioGroup;
