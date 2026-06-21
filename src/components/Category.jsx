import React from "react";
import TextInput from "./TextInput";
import RadioGroup from "./RadioGroup";

function Category({ label, inputs }) {
  return (
    <div className="dark:text-main-text flex flex-col gap-3 p-5">
      <h1 className="text-xl">{label}</h1>
      {inputs.map((input) => (
        <div key={input.id} className=" dark:text-main-text">
          {input.type === "radio" ? (
            <RadioGroup label={input.label} options={input.options} />
          ) : (
            <TextInput
              label={input.label}
              defaultValue={input.defaultValue}
              type={input.type}
              className={input.className}
              Logo={input.logo}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Category;
