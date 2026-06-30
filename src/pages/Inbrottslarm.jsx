import React, { useContext, useState } from "react";
import { Construction } from "lucide-react";
import Category from "../components/Category";
import TextInput from "../components/TextInput";
import { Calendar } from "lucide-react";
import TestedSections from "../components/TestedSections";

function Inbrottslarm({ userSettings }) {
  return (
    <div className="animate-fade-in">
      <h1 className="dark:text-main-text text-xl">
        Revisionsprotokoll Inbrottslarm
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
      <Category
        label={"Kunduppgifter"}
        inputs={[
          { label: "Kund", id: "customer" },
          { label: "Anläggning", id: "facility" },
          { label: "Kontaktperson", id: "contact-person" },
        ]}
      />
      <Category
        label={"Centralapparat"}
        inputs={[
          { label: "Typ", id: "c-type" },
          { label: "Antal sektioner", id: "c-sections", type: "number" },
          { label: "Laddspänning", id: "c-charge", extra: "V", type: "number" },
          { label: "Version", id: "c-version" },
          {
            label: "Display/Summer",
            id: "c-display",
            type: "checkbox",
            options: ["Kontrollerad OK", "Åtgärd behövs"],
          },
          {
            label: "Tid/Datum",
            id: "c-time",
            type: "checkbox",
            options: [
              "Kontrollerad OK",
              "Justerat tid",
              "Åtgärd behövs",
              "Funktion saknas",
            ],
          },
        ]}
      />
      {/* <TestedSections label="Sektionsprov" /> */}
      <Category
        label={"Sektionsprov"}
        inputs={[
          {
            label: "Kontroll sektion",
            id: "section-control",
            type: "list",
          },
        ]}
      />
      <Category
        label={"Ackumulatorer"}
        inputs={[
          {
            label: "Kontroll av batterier",
            id: "battery-check",
            type: "checkbox",
            options: ["Kontrollerad OK", "Byte utfört", "Åtgärd behövs"],
          },
          {
            label: "Antal",
            extra: "st",
            id: "battery-number",
            type: "number",
          },
          {
            label: "Typ",
            extra: "Ah",
            id: "battery-type",
            type: "number",
          },
          {
            label: "Nästa batteribyte",
            id: "battery-next",
            type: "date",
            defaultValue: "",
            className: "[&::-webkit-calendar-picker-indicator]:opacity-0",
            logo: Calendar,
          },
        ]}
      />
      <Category
        label={"Prov larmdon och indikering"}
        inputs={[
          {
            label: "Larmdon",
            id: "siren-test",
            type: "checkbox",
            options: ["Kontrollerad OK", "Åtgärd behövs", "Ej aktuellt"],
          },
          {
            label: "Yttre larmdon",
            id: "ext-siren-test",
            type: "checkbox",
            options: [
              "Kontrollerad OK",
              "Åtgärd behövs",
              "Saknas",
              "Ej aktuellt",
            ],
          },
        ]}
      />
      <Category
        label={"Prov utgångar och styrningar"}
        inputs={[
          {
            label: "Lås/Kortläsaråterkoppling",
            id: "out-lock",
            type: "checkbox",
            options: ["Kontrollerad OK", "Åtgärd behövs", "Funktion saknas"],
          },
          {
            label: "Belysningsstyrning",
            id: "out-lamps",
            type: "checkbox",
            options: ["Kontrollerad OK", "Åtgärd behövs", "Funktion saknas"],
          },
          {
            label: "Övriga styrningar",
            id: "out-other",
            type: "checkbox-list",
            options: [],
          },
        ]}
      />
      <Category
        label={"Prov larmöverföring"}
        inputs={[
          { label: "Larmsändare typ", id: "send-type" },
          {
            label: "Prov karaktär",
            id: "send-character",
            type: "checkbox-list",
            options: [
              "Inbrottslarm",
              "Fellarm/Sabotage",
              "Brandlarm",
              "Fellarm brand",
            ],
          },
          // {
          //   label: "Status",
          //   id: "send-status",
          //   type: "checkbox",
          //   options: ["Kontrollerad OK", "Åtgärd behövs"],
          // },
        ]}
      />
      <Category
        label={"Dokumentation"}
        inputs={[
          {
            label: "OR/SR-ritningar",
            id: "doc-schematics",
            type: "checkbox",
            options: ["Kontrollerad OK", "Åtgärd behövs", "Ej aktuellt"],
          },
          {
            label: "Anläggarintyg",
            id: "doc-cert",
            type: "checkbox",
            options: [
              "Kontrollerad OK",
              "Åtgärd behövs",
              "Saknas",
              "Ej aktuellt",
            ],
          },
          {
            label: "Datum anläggarintyg",
            id: "doc-cert-date",
            type: "date",
            defaultValue: "",
            className: "[&::-webkit-calendar-picker-indicator]:opacity-0",
            logo: Calendar,
          },
          {
            label: "Anläggningsskötarskylt",
            id: "doc-staff",
            type: "checkbox",
            options: ["Kontrollerad OK", "Åtgärd behövs", "Ej aktuellt"],
          },
        ]}
      />
      <Category
        label={"Förbättringsförslag"}
        inputs={[{ label: "", id: "improvements", type: "big-text" }]}
      />
    </div>
  );
}

export default Inbrottslarm;
