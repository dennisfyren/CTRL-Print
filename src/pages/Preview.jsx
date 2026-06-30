import React, { useState, useEffect, useRef } from "react";
import PreviewCard from "../components/PreviewCard";
import { useDataContext } from "../hooks/DataContext";
import DisplayText from "../components/displayData/DisplayText";
import LineBreak from "../components/LineBreak";
import Button from "../components/Button";
import { Pen, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { Trash } from "lucide-react";

const MANUAL_SECTIONS = ["Kunduppgifter", "Kontaktuppgifter"];
const A4_WIDTH = 764;
const A4_HEIGHT = 1123;

function Preview({ userSettings, page, setOpen, controlType }) {
  const containerRef = useRef(null);
  const printRef = useRef(null);
  const logo = userSettings?.logo;
  const { setData, data } = useDataContext();
  const [scale, setScale] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 1024px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    pageStyle: `
    @page { size: A4; margin: 0; }
    .preview-card {
      break-inside: avoid;
    }
    .a4-print {
      width: ${A4_WIDTH}px !important;
      transform: none !important;
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
  const topRef = useRef(null);
  const prevSectionCount = useRef(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const currentCount = Object.keys(data).filter(
      (key) => Object.keys(data[key] ?? {}).length > 0,
    ).length;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevSectionCount.current = currentCount;
      return;
    }

    if (isDesktop && currentCount > prevSectionCount.current) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }

    prevSectionCount.current = currentCount;
  }, [data, isDesktop]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const scaleX = width / A4_WIDTH;
      const scaleY = height / A4_HEIGHT;
      setScale(Math.min(scaleX, scaleY, 1)); // never upscale
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isDesktop]);

  if (!data) return null;

  return (
    <div className="flex flex-col relative h-full w-full animate-fade-in">
      <Button
        label="Reset"
        className="fixed sm:top-28 hidden 2xl:block lg:top-6 h-12 w-32 opacity-85 hover:opacity-90 bg-red-500 hover:bg-red-700 z-50"
        handleClick={resetData}
        Logo={Trash}
      />
      <Button
        label="Tillbaka"
        className="2xl:hidden fixed bottom-4 sm:top-3 opacity-90 h-12 w-40 bg-gray-500 hover:bg-gray-700 z-50"
        handleClick={() => {
          setOpen(page);
        }}
        Logo={Pen}
      />
      <Button
        label={"Print"}
        className={`fixed right-4 sm:top-28 bottom-4 lg:top-3 h-12 w-40 opacity-90 sm:opacity-85 hover:opacity-90 ${clicked ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} z-999`}
        Logo={Printer}
        handleClick={handlePrint}
      />
      <div
        ref={containerRef}
        className={`flex w-full relative no-scrollbar ${
          isDesktop
            ? "items-center justify-center h-full overflow-auto"
            : "flex-col h-auto overflow-visible"
        }`}
      >
        <div ref={topRef} />
        <div
          ref={printRef}
          style={
            isDesktop
              ? {
                  width: A4_WIDTH,
                  minHeight: A4_HEIGHT,
                  transform: `scale(${scale})`,
                  transformOrigin: "top center",
                  backgroundColor: "white",
                }
              : {
                  width: "100%",
                  minHeight: "auto",
                  backgroundColor: "white",
                }
          }
          className="px-8 py-5 print:mt-0 text-xs print:shadow-none shadow-xl a4-print"
        >
          <div className="flex flex-col sm:grid sm:grid-cols-[1fr_2fr_1fr] print:grid print:grid-cols-[1fr_2fr_1fr] text-center mb-2 items-center print:items-start">
            <img src={logo} className="h-16 my-4 print:my-0 min-w-0"></img>
            <h1 className="font-semibold text-sm min-w-0 mb-2 print:mb-0">
              {setControlType(page)}
            </h1>
            <div className="text-xs flex flex-col items-start min-w-0 break-words">
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
        <div className="h-16 w-full sm:hidden bg-main-bg dark:bg-main-bg-dark"></div>
      </div>
      <div ref={bottomRef} />
    </div>
  );
}

export default Preview;
