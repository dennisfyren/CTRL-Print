import React, { useState, useEffect, useRef, useContext } from "react";
import PreviewCard from "../components/PreviewCard";
import { useDataContext } from "../hooks/DataContext";
import DisplayText from "../components/displayData/DisplayText";

function Preview({ userSettings, page }) {
  const A4_WIDTH = 764;
  const A4_HEIGHT = 1123;

  const containerRef = useRef(null);
  const logo = userSettings?.logo;
  const { data } = useDataContext();
  const [scale, setScale] = useState(1);

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

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const scaleX = width / A4_WIDTH;
      const scaleY = height / A4_HEIGHT;
      setScale(Math.min(scaleX, scaleY, 1)); // never upscale
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full h-full overflow-hidden"
    >
      <div
        style={{
          width: A4_WIDTH,
          height: A4_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          backgroundColor: "white",
          boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
        }}
        className="px-8 py-5 text-xs"
      >
        <div className="grid grid-cols-[1fr_2fr_1fr] text-center">
          {<img src={logo} className="h-12"></img>}
          <h1 className="font-semibold text-sm">{setControlType(page)}</h1>
          <div className="text-xs flex flex-col items-start">
            <p>{userSettings?.company}</p>
            <p>{userSettings?.address}</p>
            <p>
              {userSettings?.postalCode} {userSettings?.city}
            </p>
            <br />
            <p>{userSettings?.email}</p>
            <p>{userSettings?.phone}</p>
          </div>
        </div>
        <div className="grid grid-cols-2">
          {data?.["Kontaktuppgifter"] && (
            <PreviewCard data={data["Kontaktuppgifter"]} />
          )}
          {/* {data?.["Kunduppgifter"] && (
            <DisplayText data={data["Kunduppgifter"]} key={"kunduppgifter"} />
          )}
          {data?.["Kontaktuppgifter"] && (
            <DisplayText data={data["Kontaktuppgifter"]} />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Preview;
