import React, { useState, useEffect, useRef } from "react";
import PreviewCard from "../components/PreviewCard";
import { useDataContext } from "../hooks/DataContext";
import DisplayText from "../components/displayData/DisplayText";
import LineBreak from "../components/LineBreak";
import Button from "../components/Button";
import { Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { Trash } from "lucide-react";

const MANUAL_SECTIONS = ["Kunduppgifter", "Kontaktuppgifter"];
const A4_WIDTH = 764;
const A4_HEIGHT = 1123;

function Preview({ userSettings, page, setOpen }) {
  const containerRef = useRef(null);
  const printRef = useRef(null);
  const logo = userSettings?.logo;
  const { setData, data } = useDataContext();
  const [scale, setScale] = useState(1);
  const [clicked, setClicked] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    pageStyle: `
    @page { size: A4; margin: 0; }
    .preview-card {
      break-inside: avoid;
    }
  `,
  });

  function resetData() {
    setData({});
  }

  function setControlType(type) {
    switch (type) {
      case "fire":
        return "Revisionsprotokoll Brandlarm";
        break;
      case "breakin":
        return "Revisionsprotokoll Inbrottslarm";
        break;
      case "ce":
        return "CE-Märkning";
        break;
    }
  }

  const bottomRef = useRef(null);
  const prevSectionCount = useRef(0);

  useEffect(() => {
    const currentCount = Object.keys(data).filter(
      (key) => Object.keys(data[key] ?? {}).length > 0,
    ).length;

    if (currentCount > prevSectionCount.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    prevSectionCount.current = currentCount;
  }, [data]);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const scaleX = width / A4_WIDTH;
      const scaleY = height;
      setScale(Math.min(scaleX, scaleY, 1)); // never upscale
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!data) return null;

  return (
    <div className="flex flex-col relative">
      <Button
        label="Reset"
        className="fixed top-6 h-12 w-32 opacity-85 hover:opacity-90 bg-red-500 hover:bg-red-700 z-50"
        handleClick={resetData}
        Logo={Trash}
      />
      <Button
        label={"Print"}
        className={`fixed right-4 top-3 h-12 w-32 opacity-85 hover:opacity-90 ${clicked ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} z-999`}
        Logo={Printer}
        handleClick={handlePrint}
      />
      <div
        ref={containerRef}
        className="flex items-center justify-center w-full h-full overflow-auto no-scrollbar relative"
      >
        <div
          ref={printRef}
          style={{
            width: A4_WIDTH,
            minHeight: A4_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            backgroundColor: "white",
          }}
          className="px-8 py-5 print:mt-0 text-xs print:shadow-none shadow-xl a4-print"
        >
          <div className="grid grid-cols-[1fr_2fr_1fr] text-center mb-2">
            {<img src={logo} className="h-16"></img>}
            <h1 className="font-semibold text-sm">{setControlType(page)}</h1>
            <div className="text-xs flex flex-col items-start">
              <p>{userSettings?.company}</p>
              <p>{userSettings?.address}</p>
              <p className="mb-[0.3rem]">
                {userSettings?.postalCode} {userSettings?.city}
              </p>
              <p>{userSettings?.email}</p>
              <p>{userSettings?.phone}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 my-6">
            <PreviewCard data={data["Kunduppgifter"]} className="" />
            <PreviewCard data={data["Kontaktuppgifter"]} className="" />
          </div>
          <PreviewCard
            data={data["Centralapparat"]}
            title={"Centralapparat"}
            number={1}
          />
          <PreviewCard
            data={data["Sektionsprov"]}
            title={"Sektionsprov"}
            number={2}
          />
          <PreviewCard
            data={data["Ackumulatorer"]}
            title={"Ackumulatorer"}
            number={3}
          />
          <PreviewCard
            data={data["Prov larmdon och indikering"]}
            title={"Prov larmdon och indikering"}
            number={4}
          />
          <PreviewCard
            data={data["Prov utgångar och styrningar"]}
            title={"Prov utgångar och styrningar"}
            number={5}
          />
          <PreviewCard
            data={data["Prov larmöverföring"]}
            title={"Prov larmöverföring"}
            number={6}
          />
          <PreviewCard
            data={data["Dokumentation"]}
            title={"Dokumentation"}
            number={7}
          />
          <PreviewCard
            data={data["Förbättringsförslag"]}
            title={"Förbättringsförslag"}
            number={8}
          />
        </div>
      </div>
      <div ref={bottomRef} />
    </div>
  );
}

export default Preview;
