import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { Plus } from "lucide-react";
import { useDataContext } from "../hooks/DataContext";

function TestedSections({ label = "Sektionsprov" }) {
  const { data, setData } = useDataContext();
  const [sections, setSections] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const category = data?.[label];
    if (!category) {
      setSections([]);
      return;
    }

    const storedSections = Object.values(category)
      .map((entry) => entry?.values?.[0] ?? entry?.[label] ?? "")
      .filter(Boolean);

    setSections(storedSections);
  }, [data, label]);

  const handleClick = () => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    const nextSections = [...sections, trimmedValue];
    setSections(nextSections);
    setValue("");

    setData((prev) => ({
      ...prev,
      [label]: {
        ...(prev?.[label] || {}),
        [`section-${nextSections.length - 1}`]: {
          values: [trimmedValue],
        },
      },
    }));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="ml-5">
      <h1 className="text-xl">Sektionsprov</h1>
      {sections && (
        <div className="flex flex-col gap-1 p-3">
          {sections.map((value, index) => (
            <p key={`section-${index}`}>{`Sektion ${value}`}</p>
          ))}
        </div>
      )}
      <div className="flex">
        <TextInput
          value={value}
          label={"Sektion"}
          className="dark:text-main-text"
          handleChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleClick()}
        />
        <Button
          label={""}
          Logo={Plus}
          logoSize={24}
          className="ml-4 relative w-10 bg-green-500 hover:bg-green-600"
          handleClick={(e) => {
            handleClick(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default TestedSections;
