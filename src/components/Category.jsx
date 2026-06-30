import React, { useState, useEffect } from "react";
import TextInput from "./TextInput";
import RadioGroup from "./RadioGroup";
import { useDataContext } from "../hooks/DataContext";
import LineBreak from "./LineBreak";
import CheckboxGroup from "./CheckboxGroup";
import TextInputLarge from "./TextInputLarge";
import Button from "./Button";
import { Plus, X } from "lucide-react";

function Category({ label, inputs }) {
  const { data, setData } = useDataContext();
  const [listInputs, setListInputs] = useState({});

  function attachExtraToValue(obj, extra) {
    if (!extra || !obj) return obj;

    const [[key, value]] = Object.entries(obj);

    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      return obj;
    }

    return { [key]: { ...value, extra } };
  }

  function updateCategory(obj, extra = null) {
    const objWithExtra = attachExtraToValue(obj, extra);

    setData((prev) => {
      const updatedCategory = { ...prev[label] };

      Object.entries(objWithExtra).forEach(([key, value]) => {
        const isEmpty =
          value === null ||
          value?.[Object.keys(value)[0]] === "" ||
          (value?.values && value.values.length === 0);

        if (isEmpty) {
          delete updatedCategory[key];
          return;
        }

        // Only normalize for list type (Sektionsprov)
        if (
          value?.values &&
          Array.isArray(value.values) &&
          value.label === "Sektionsprov"
        ) {
          value = {
            ...value,
            values: normalizeList(value.values),
          };
        }

        updatedCategory[key] = value;
      });

      return { ...prev, [label]: updatedCategory };
    });
  }

  // ---------------- NORMALIZER ----------------

  function normalizeList(values = []) {
    return values.map((item) => {
      if (typeof item === "string") {
        return {
          value: item,
          status: "Kontrollerad OK",
          comment: null,
        };
      }

      return {
        value: item?.value ?? "",
        status: item?.status ?? "Kontrollerad OK",
        comment: item?.comment ?? null,
      };
    });
  }

  function getListValues(id) {
    const values = data[label]?.[id]?.values ?? [];
    return normalizeList(values);
  }

  // ---------------- INPUT HELPERS ----------------

  function getInputValue(input) {
    const saved = data[label]?.[input.id];
    if (saved == null) return undefined;

    if (typeof saved === "string" || typeof saved === "number") {
      return saved;
    }

    if (typeof saved === "object") {
      if (saved[input.label] !== undefined) return saved[input.label];

      if (saved.values) {
        return Array.isArray(saved.values)
          ? saved.values
              .map((item) =>
                typeof item === "object" && item !== null ? item.value : item,
              )
              .join(", ")
          : saved.values;
      }
    }

    return undefined;
  }

  function getCommentValue(input) {
    return data[label]?.[`comment-${input.id}`] ?? null;
  }

  function updateComments(key, value, commentLabel = "Notering") {
    const rawValue =
      typeof value === "object" && value !== null
        ? Object.values(value)[0]
        : value;

    setData((prev) => ({
      ...prev,
      [label]: {
        ...prev[label],
        [`comment-${key}`]: rawValue
          ? { label: commentLabel, values: [rawValue] }
          : null,
      },
    }));
  }

  // ---------------- LIST ACTIONS ----------------

  function addListItem(id, listLabel = "Sektionsprov") {
    const text = (listInputs[id] ?? "").trim();
    if (!text) return;

    const current = getListValues(id);

    updateCategory({
      [id]: {
        label: listLabel,
        values: [
          ...current,
          {
            value: text,
            status: "Kontrollerad OK",
            comment: null,
          },
        ],
      },
    });

    setListInputs((prev) => ({
      ...prev,
      [id]: "",
    }));
  }

  function removeListItem(id, index, listLabel = "Sektionsprov") {
    const updated = getListValues(id).filter((_, i) => i !== index);

    updateCategory({
      [id]:
        updated.length === 0
          ? null
          : {
              label: listLabel,
              values: updated,
            },
    });
  }

  function updateListStatus(id, index, status, listLabel = "Sektionsprov") {
    const items = getListValues(id);

    const updated = [...items];
    updated[index] = {
      ...updated[index],
      status,
    };

    updateCategory({
      [id]: {
        label: listLabel,
        values: updated,
      },
    });
  }

  function updateListComment(id, index, value, listLabel = "Sektionsprov") {
    const items = getListValues(id);
    const updated = [...items];

    const rawValue =
      typeof value === "object" && value !== null
        ? Object.values(value)[0]
        : value;

    updated[index] = {
      ...updated[index],
      comment: rawValue || null,
    };

    updateCategory({
      [id]: { label: listLabel, values: updated },
    });
  }

  // ---------------- RENDER ----------------

  return (
    <div className="dark:text-main-text flex flex-col gap-4 sm:p-5 py-2">
      <h1 className="text-2xl">{label}</h1>

      {inputs?.map((input) => (
        <div key={input.id}>
          {/* RADIO */}
          {input.type === "radio" && (
            <RadioGroup
              name={input.id}
              label={input.label}
              extra={input.extra}
              options={input.options}
              value={data[label]?.[input.id]?.values?.[0] ?? ""}
              handleChange={(obj) => updateCategory(obj, input.extra)}
            />
          )}

          {/* BIG TEXT */}
          {input.type === "big-text" && (
            <TextInputLarge
              name={input.id}
              label={input.label}
              extra={input.extra}
              defaultValue={input.defaultValue}
              value={getInputValue(input)}
              className={input.className}
              handleDataChange={(obj) => updateCategory(obj, input.extra)}
            />
          )}

          {/* CHECKBOX */}
          {input.type === "checkbox" && (
            <CheckboxGroup
              name={input.id}
              label={input.label}
              extra={input.extra}
              options={input.options}
              value={(data[label]?.[input.id]?.values ?? []).map((item) =>
                typeof item === "object" && item !== null ? item.value : item,
              )}
              handleChange={(obj) => updateCategory(obj, input.extra)}
            />
          )}

          {/* LIST */}
          {input.type === "list" && (
            <div className="ml-5">
              <h1 className="text-xl">{input.label}</h1>

              <div className="flex flex-col gap-3 py-3 px-1">
                {getListValues(input.id).map((item, index) => (
                  <div
                    key={`${input.id}-${index}`}
                    className="rounded sm:w-130 w-72 bg-gray-100 dark:bg-gray-800 px-2 py-3 flex flex-col gap-2"
                  >
                    <div className="flex justify-between relative">
                      <span>{item.value}</span>
                      <Button
                        className="absolute top-0 right-0 cursor-pointer text-red-500"
                        Logo={X}
                        logoSize={26}
                        handleClick={() =>
                          removeListItem(input.id, index, input.label)
                        }
                      />
                    </div>

                    {/* STATUS */}
                    <div className="flex flex-col sm:flex-row sm:gap-4 gap-1 text-sm">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`${input.id}-${index}`}
                          checked={item.status === "Kontrollerad OK"}
                          onChange={() =>
                            updateListStatus(
                              input.id,
                              index,
                              "Kontrollerad OK",
                              input.label,
                            )
                          }
                        />
                        Kontrollerad OK
                      </label>
                      <label className="flex items-center gap-2 mb-2">
                        <input
                          type="radio"
                          name={`${input.id}-${index}`}
                          checked={item.status === "Åtgärd behövs"}
                          onChange={() =>
                            updateListStatus(
                              input.id,
                              index,
                              "Åtgärd behövs",
                              input.label,
                            )
                          }
                        />
                        Åtgärd behövs
                      </label>
                    </div>

                    {/* COMMENT */}
                    {item.status === "Åtgärd behövs" && (
                      <TextInput
                        name={`comment-${input.id}-${index}`}
                        label="Notering"
                        className="animate-fade-in"
                        value={item.comment ?? ""}
                        handleDataChange={(obj) =>
                          updateListComment(
                            input.id,
                            index,
                            obj[`comment-${input.id}-${index}`],
                            input.label,
                          )
                        }
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* ADD ITEM */}
              <div className="flex mt-2 items-center">
                <TextInput
                  value={listInputs[input.id] ?? ""}
                  label="Sektion"
                  handleChange={(e) =>
                    setListInputs((prev) => ({
                      ...prev,
                      [input.id]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addListItem(input.id, input.label);
                    }
                  }}
                />
                <Button
                  Logo={Plus}
                  logoSize={24}
                  className="relative bg-green-500 hover:bg-green-600 w-10 h-10 ml-4"
                  handleClick={() => addListItem(input.id, input.label)}
                />
              </div>
            </div>
          )}

          {/* CHECKBOX-LIST */}
          {input.type === "checkbox-list" && (
            <div className="ml-1">
              <h1 className="text-xl">{input.label}</h1>

              {/* PREDEFINED OPTION CHECKBOXES */}
              <div className="flex flex-col gap-1 p-3">
                {input.options.map((option) => {
                  // Read raw from data to avoid double-normalization
                  const items = data[label]?.[input.id]?.values ?? [];
                  const isChecked = items.some((item) =>
                    typeof item === "object"
                      ? item.value === option
                      : item === option,
                  );

                  return (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        className="w-6 h-6 mb-1 accent-main-orange"
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            const updated = items.filter((item) =>
                              typeof item === "object"
                                ? item.value !== option
                                : item !== option,
                            );
                            updateCategory({
                              [input.id]:
                                updated.length === 0
                                  ? null
                                  : { label: input.label, values: updated },
                            });
                          } else {
                            updateCategory({
                              [input.id]: {
                                label: input.label,
                                values: [
                                  ...items,
                                  {
                                    value: option,
                                    status: "Kontrollerad OK",
                                    comment: null,
                                  },
                                ],
                              },
                            });
                          }
                        }}
                      />
                      {option}
                    </label>
                  );
                })}
              </div>

              {/* CARDS FOR CHECKED ITEMS */}
              <div className="flex flex-col gap-3 p-3">
                {getListValues(input.id).map((item, index) => (
                  <div
                    key={`${input.id}-${index}`}
                    className="rounded sm:w-130 w-72 bg-gray-100 dark:bg-gray-800 px-2 py-3 flex flex-col gap-2"
                  >
                    <div className="flex justify-between relative">
                      <span className="font-medium">{item.value}</span>
                      {/* Only show X for custom (non-predefined) items */}
                      {!input.options.includes(item.value) && (
                        <Button
                          className="absolute top-0 right-0 cursor-pointer text-red-500"
                          Logo={X}
                          logoSize={24}
                          handleClick={() =>
                            removeListItem(input.id, index, input.label)
                          }
                        />
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:gap-4 gap-1 text-sm">
                      <label className="flex items-center gap-2">
                        <input
                          className="w-5 h-5 accent-main-orange"
                          type="radio"
                          name={`${input.id}-${index}`}
                          checked={item.status === "Kontrollerad OK"}
                          onChange={() =>
                            updateListStatus(
                              input.id,
                              index,
                              "Kontrollerad OK",
                              input.label,
                            )
                          }
                        />
                        Kontrollerad OK
                      </label>
                      <label className="flex items-center gap-2 ">
                        <input
                          className="w-5 h-5 accent-main-orange"
                          type="radio"
                          id={`${input.id}-${index}`}
                          name={`${input.id}-${index}`}
                          checked={item.status === "Åtgärd behövs"}
                          onChange={() =>
                            updateListStatus(
                              input.id,
                              index,
                              "Åtgärd behövs",
                              input.label,
                            )
                          }
                        />
                        Åtgärd behövs
                      </label>
                    </div>

                    {item.status === "Åtgärd behövs" && (
                      <TextInput
                        name={`comment-${input.id}-${index}`}
                        label="Notering"
                        className="animate-fade-in"
                        value={item.comment ?? ""}
                        handleDataChange={(obj) =>
                          updateListComment(
                            input.id,
                            index,
                            obj[`comment-${input.id}-${index}`],
                            input.label,
                          )
                        }
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* ADD CUSTOM ITEM */}
              <div className="flex mt-3 items-center">
                <TextInput
                  value={listInputs[input.id] ?? ""}
                  label="Annan"
                  handleChange={(e) =>
                    setListInputs((prev) => ({
                      ...prev,
                      [input.id]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addListItem(input.id, input.label);
                    }
                  }}
                />
                <Button
                  Logo={Plus}
                  logoSize={24}
                  className="relative bg-green-500 hover:bg-green-600 w-10 h-10 ml-4"
                  handleClick={() => addListItem(input.id, input.label)}
                />
              </div>
            </div>
          )}

          {/* DEFAULT INPUT */}
          {input.type !== "radio" &&
            input.type !== "checkbox" &&
            input.type !== "checkbox-list" &&
            input.type !== "list" &&
            input.type !== "big-text" && (
              <TextInput
                name={input.id}
                label={input.label}
                extra={input.extra}
                defaultValue={input.defaultValue}
                value={getInputValue(input)}
                type={input.type}
                className={input.className}
                handleDataChange={(obj) => updateCategory(obj, input.extra)}
                Logo={input.logo}
              />
            )}

          {/* GLOBAL COMMENT (non-list) */}
          {data[label]?.[input.id]?.values?.includes("Åtgärd behövs") && (
            <div className="mt-4 ml-4">
              <TextInput
                name={`comment-${input.id}`}
                label="Notering"
                className="animate-fade-in"
                value={getCommentValue(input)?.values?.[0]}
                handleDataChange={(obj) =>
                  updateComments(
                    input.id,
                    obj[`comment-${input.id}`],
                    "Notering",
                  )
                }
              />
            </div>
          )}
        </div>
      ))}

      <LineBreak />
    </div>
  );
}

export default Category;

// import React, { useEffect, useState } from "react";
// import TextInput from "./TextInput";
// import RadioGroup from "./RadioGroup";
// import { useDataContext } from "../hooks/DataContext";
// import LineBreak from "./LineBreak";
// import CheckboxGroup from "./CheckboxGroup";
// import { Calendar, Plus } from "lucide-react";
// import TextInputLarge from "./TextInputLarge";
// import Button from "./Button";

// function Category({ label, inputs }) {
//   const { data, setData } = useDataContext();
//   const [sections, setSections] = useState([]);
//   const [value, setValue] = useState("");

//   // useEffect(() => {
//   //   console.log(data);
//   // }, [data]);

//   function attachExtraToValue(obj, extra) {
//     if (!extra || !obj) return obj;
//     const [[key, value]] = Object.entries(obj);
//     if (value === null || typeof value !== "object" || Array.isArray(value))
//       return obj;
//     return { [key]: { ...value, extra } };
//   }

//   function updateCategory(obj, extra = null) {
//     const objWithExtra = attachExtraToValue(obj, extra);

//     setData((prev) => {
//       const updatedCategory = { ...prev[label] };

//       Object.entries(objWithExtra).forEach(([key, value]) => {
//         if (value === null || value?.[Object.keys(value)[0]] === "") {
//           delete updatedCategory[key];
//         } else {
//           updatedCategory[key] = value;
//         }
//       });

//       return { ...prev, [label]: updatedCategory };
//     });
//   }

//   function normalizeCommentValue(value) {
//     if (value == null || value === "") return null;
//     if (typeof value === "string" || typeof value === "number") return value;
//     if (typeof value === "object") {
//       const nested = Object.values(value)[0];
//       if (nested == null) return null;
//       return normalizeCommentValue(nested);
//     }
//     return String(value);
//   }

//   function updateComments(key, value, commentLabel = "Notering") {
//     const normalizedValue = normalizeCommentValue(value);

//     setData((prev) => ({
//       ...prev,
//       [label]: {
//         ...prev[label],
//         [`comment-${key}`]:
//           normalizedValue === null
//             ? null
//             : { label: commentLabel, values: [normalizedValue] },
//       },
//     }));
//   }

//   function getInputValue(input) {
//     const saved = data[label]?.[input.id];
//     if (saved == null) return undefined;
//     if (typeof saved === "string" || typeof saved === "number") return saved;
//     if (typeof saved === "object") {
//       if (saved[input.label] !== undefined) return saved[input.label];
//       if (saved.values) {
//         return Array.isArray(saved.values)
//           ? saved.values.join(", ")
//           : saved.values;
//       }
//     }
//     return undefined;
//   }

//   function getCommentValue(input) {
//     return data[label]?.[`comment-${input.id}`] ?? null;
//   }

//   function handleChange() {}

//   return (
//     <div className="dark:text-main-text flex flex-col gap-4 p-5">
//       <h1 className="text-2xl">{label}</h1>
//       {inputs?.map((input) => (
//         <div key={input.id} className="dark:text-main-text">
//           {input.type === "radio" && (
//             <RadioGroup
//               name={input.id}
//               label={input.label}
//               extra={input.extra}
//               options={input.options}
//               handleChange={(obj) => updateCategory(obj, input.extra)}
//             />
//           )}
//           {input.type === "big-text" && (
//             <TextInputLarge
//               name={input.id}
//               label={input.label}
//               extra={input.extra}
//               defaultValue={input.defaultValue}
//               value={getInputValue(input)}
//               className={input.className}
//               handleDataChange={(obj) => updateCategory(obj, input.extra)}
//             />
//           )}
//           {input.type === "checkbox" && (
//             <div>
//               <CheckboxGroup
//                 name={input.id}
//                 label={input.label}
//                 extra={input.extra}
//                 options={input.options}
//                 handleChange={(obj) => updateCategory(obj, input.extra)}
//               />
//               {data[label]?.[input.id]?.values?.includes("Annan") && (
//                 <div className="mt-4">
//                   <TextInput
//                     name={`other-${input.id}`}
//                     label="Annan typ"
//                     className="animate-fade-in"
//                     value={
//                       data[label]?.[`comment-${input.id}-type`]?.values?.[0]
//                     }
//                     clearOnUnmount
//                     handleDataChange={(obj) =>
//                       updateComments(
//                         `${input.id}-type`,
//                         obj[`other-${input.id}`],
//                         "Annan typ",
//                       )
//                     }
//                   />
//                 </div>
//               )}
//             </div>
//           )}
//           {input.type === "list" && (
//             <div className="ml-5">
//               <h1 className="text-xl">Sektionsprov</h1>
//               {sections && (
//                 <div className="flex flex-col gap-1 p-3">
//                   {sections.map((value, index) => (
//                     <p key={`section-${index}`}>{`Sektion ${value}`}</p>
//                   ))}
//                 </div>
//               )}
//               <div className="flex">
//                 <TextInput
//                   value={value}
//                   label={"Sektion"}
//                   className="dark:text-main-text"
//                   handleChange={handleChange}
//                   onKeyDown={(e) => e.key === "Enter" && handleClick()}
//                 />
//                 <Button
//                   label={""}
//                   Logo={Plus}
//                   logoSize={24}
//                   className="ml-4 relative w-10 bg-green-500 hover:bg-green-600"
//                   handleClick={(e) => {
//                     handleClick(e.target.value);
//                   }}
//                 />
//               </div>
//             </div>
//           )}
//           {input.type !== "radio" &&
//             input.type !== "checkbox" &&
//             input.type !== "list" &&
//             input.type !== "big-text" && (
//               <TextInput
//                 name={input.id}
//                 label={input.label}
//                 extra={input.extra}
//                 defaultValue={input.defaultValue}
//                 value={getInputValue(input)}
//                 type={input.type}
//                 className={input.className}
//                 Logo={input.logo}
//                 handleDataChange={(obj) => updateCategory(obj, input.extra)}
//               />
//             )}
//           {data[label]?.[input.id]?.values?.includes("Åtgärd behövs") && (
//             <div className="mt-4">
//               <TextInput
//                 name={`comment-${input.id}`}
//                 label="Notering"
//                 className="animate-fade-in"
//                 value={getCommentValue(input)?.values?.[0]}
//                 handleDataChange={(obj) =>
//                   updateComments(
//                     input.id,
//                     obj[`comment-${input.id}`],
//                     "Notering",
//                   )
//                 }
//               />
//             </div>
//           )}
//         </div>
//       ))}
//       <LineBreak />
//     </div>
//   );
// }

// export default Category;
