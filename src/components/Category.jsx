import React, { useEffect } from "react";
import TextInput from "./TextInput";
import RadioGroup from "./RadioGroup";
import { useDataContext } from "../hooks/DataContext";
import LineBreak from "./LineBreak";
import CheckboxGroup from "./CheckboxGroup";
import { Calendar } from "lucide-react";
import TextInputLarge from "./TextInputLarge";

function Category({ label, inputs }) {
  const { data, setData } = useDataContext();

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  function updateCategory(obj) {
    setData((prev) => {
      const updatedCategory = { ...prev[label] };

      Object.entries(obj).forEach(([key, value]) => {
        if (value === null || value?.[Object.keys(value)[0]] === "") {
          delete updatedCategory[key];
        } else {
          updatedCategory[key] = value;
        }
      });

      return { ...prev, [label]: updatedCategory };
    });
  }

  function updateComments(key, value) {
    setData((prev) => ({
      ...prev,
      [label]: {
        ...prev[label],
        [`comment-${key}`]: value,
      },
    }));
  }

  return (
    <div className="dark:text-main-text flex flex-col gap-4 p-5">
      <h1 className="text-2xl">{label}</h1>
      {inputs?.map((input) => (
        <div key={input.id} className="dark:text-main-text">
          {input.type === "radio" && (
            <RadioGroup
              name={input.id}
              label={input.label}
              extra={input.extra}
              options={input.options}
              handleChange={(obj) => updateCategory(obj)}
            />
          )}
          {input.type === "big-text" && (
            <TextInputLarge
              name={input.id}
              label={input.label}
              extra={input.extra}
              defaultValue={input.defaultValue}
              className={input.className}
              handleDataChange={(obj) => updateCategory(obj)}
            />
          )}
          {input.type === "checkbox" && (
            <div>
              <CheckboxGroup
                name={input.id}
                label={input.label}
                extra={input.extra}
                options={input.options}
                handleChange={(obj) => updateCategory(obj)}
              />
              {data[label]?.[input.id]?.values?.includes("Annan") && (
                <div className="mt-4">
                  <TextInput
                    name={`other-${input.id}`}
                    label="Annan typ"
                    className="animate-fade-in"
                    clearOnUnmount
                    handleDataChange={(obj) =>
                      updateComments(
                        `${input.id}-type`,
                        obj[`other-${input.id}`],
                      )
                    }
                  />
                </div>
              )}
            </div>
          )}
          {input.type !== "radio" &&
            input.type !== "checkbox" &&
            input.type !== "big-text" && (
              <TextInput
                name={input.id}
                label={input.label}
                extra={input.extra}
                defaultValue={input.defaultValue}
                type={input.type}
                className={input.className}
                Logo={input.logo}
                handleDataChange={(obj) => updateCategory(obj)}
              />
            )}
          {data[label]?.[input.id]?.values?.includes("Åtgärd behövs") && (
            <TextInput
              name={`comment-${input.id}`}
              label="Notering"
              className="animate-fade-in mt-4"
              handleDataChange={(obj) =>
                updateComments(input.id, obj[`comment-${input.id}`])
              }
            />
          )}
        </div>
      ))}
      <LineBreak />
    </div>
  );
}

export default Category;
