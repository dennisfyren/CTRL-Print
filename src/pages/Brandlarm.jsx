import React from "react";
import { Construction } from "lucide-react";
import Category from "../components/Category";
import TextInput from "../components/TextInput";
import { Calendar } from "lucide-react";

function Brandlarm({ userSettings }) {
  return (
    <div className="animate-fade-in">
      <h1 className="dark:text-main-text text-xl">
        Revisionsprotokoll Brandlarm
      </h1>
      <Category
        label={"Kontaktuppgifter"}
        inputs={[
          {
            label: "Utförare",
            type: "text",
            id: "installer",
            defaultValue: userSettings?.name,
          },
          {
            label: "Datum",
            type: "date",
            id: "date",
            defaultValue: new Date().toISOString().split("T")[0],
            className: "[&::-webkit-calendar-picker-indicator]:opacity-0",
            logo: Calendar,
          },
          {
            label: "Typ av kontroll",
            type: "radio",
            options: [
              "Årskontroll",
              "6 Månader",
              "Kvartalsprov",
              "Månadsprov",
              "Extra test",
            ],
            id: "control-type",
          },
        ]}
      />
    </div>
  );
}

export default Brandlarm;
