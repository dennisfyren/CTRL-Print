import React, { useState, useEffect, useRef, useContext } from "react";
import PreviewCard from "../components/PreviewCard";
import { useDataContext } from "../hooks/DataContext";
import DisplayText from "../components/displayData/DisplayText";
import LineBreak from "../components/LineBreak";
import Button from "../components/Button";
import { Printer } from "lucide-react";

const MANUAL_SECTIONS = ["Kunduppgifter", "Kontaktuppgifter"];
const A4_WIDTH = 764;
const A4_HEIGHT = 1123;

// 1123

function Preview({ userSettings, page }) {
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
      const scaleY = height;
      setScale(Math.min(scaleX, scaleY, 1)); // never upscale
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!data) return null;

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full h-full overflow-hidden relative"
    >
      <Button
        label={"Print"}
        className="absolute bottom-16 left-8 h-12 w-32 opacity-75 hover:opacity-80 bg-blue-500 hover:bg-blue-600 z-999"
        Logo={Printer}
        handleClick={() => {}}
      />
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
          <PreviewCard data={data["Kunduppgifter"]} className="" />
          <PreviewCard data={data["Kontaktuppgifter"]} className="" />
        </div>
        <LineBreak />
        <PreviewCard
          data={data["Centralapparat"]}
          title={"Centralapparat"}
          number={1}
        />
        <PreviewCard
          data={data["Ackumulatorer"]}
          title={"Ackumulatorer"}
          number={2}
        />
        <PreviewCard
          data={data["Prov larmdon och indikering"]}
          title={"Prov larmdon och indikering"}
          number={3}
        />
        <PreviewCard
          data={data["Prov utgångar och styrningar"]}
          title={"Prov utgångar och styrningar"}
          number={4}
        />
        <PreviewCard
          data={data["Prov larmöverföring"]}
          title={"Prov larmöverföring"}
          number={5}
        />
        <PreviewCard
          data={data["Dokumentation"]}
          title={"Dokumentation"}
          number={6}
        />
        <PreviewCard
          data={data["Förbättringsförslag"]}
          title={"Förbättringsförslag"}
          number={7}
        />
      </div>
    </div>
  );
}

export default Preview;

// import React, { useState, useEffect, useRef } from "react";
// import PreviewCard from "../components/PreviewCard";
// import { useDataContext } from "../hooks/DataContext";
// import LineBreak from "../components/LineBreak";

// const MANUAL_SECTIONS = ["Kunduppgifter", "Kontaktuppgifter"];
// const A4_WIDTH = 764;
// const A4_HEIGHT = 1123;
// const HEADER_HEIGHT = 120;
// const TOPCARD_HEIGHT = 60;
// const PAGE_CONTENT_HEIGHT = A4_HEIGHT - HEADER_HEIGHT - TOPCARD_HEIGHT - 40;

// const sections = [
//   { key: "Centralapparat", title: "Centralapparat", number: 1 },
//   { key: "Ackumulatorer", title: "Ackumulatorer", number: 2 },
//   {
//     key: "Prov larmdon och indikering",
//     title: "Prov larmdon och indikering",
//     number: 3,
//   },
//   {
//     key: "Prov utgångar och styrningar",
//     title: "Prov utgångar och styrningar",
//     number: 4,
//   },
//   { key: "Prov larmöverföring", title: "Prov larmöverföring", number: 5 },
//   { key: "Dokumentation", title: "Dokumentation", number: 6 },
//   { key: "Förbättringsförslag", title: "Förbättringsförslag", number: 7 },
// ];

// function Preview({ userSettings, page }) {
//   const containerRef = useRef(null);
//   const contentRef = useRef(null);
//   const logo = userSettings?.logo;
//   const { data } = useDataContext();
//   const [scale, setScale] = useState(1);
//   const [pageChunks, setPageChunks] = useState([]);

//   function setControlType(type) {
//     switch (type) {
//       case "fire":
//         return "Revisionsprotokoll Brandlarm";
//       case "breakin":
//         return "Revisionsprotokoll Inbrottslarm";
//       case "ce":
//         return "CE-Märkning";
//     }
//   }

//   useEffect(() => {
//     const observer = new ResizeObserver(([entry]) => {
//       const { width } = entry.contentRect;
//       const scaleX = width / A4_WIDTH;
//       setScale(Math.min(scaleX, 1));
//     });
//     if (containerRef.current) observer.observe(containerRef.current);
//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!contentRef.current || !data) return;

//     const cards = Array.from(contentRef.current.children);
//     const chunks = [];
//     let currentChunk = [];
//     let currentHeight = 0;

//     cards.forEach((card, i) => {
//       const h = card.getBoundingClientRect().height;
//       if (currentHeight + h > PAGE_CONTENT_HEIGHT && currentChunk.length > 0) {
//         chunks.push(currentChunk);
//         currentChunk = [i];
//         currentHeight = h;
//       } else {
//         currentChunk.push(i);
//         currentHeight += h;
//       }
//     });

//     if (currentChunk.length > 0) chunks.push(currentChunk);
//     setPageChunks(chunks);
//   }, [data]);

//   if (!data) return null;

//   const pageStyle = {
//     width: A4_WIDTH,
//     minHeight: A4_HEIGHT,
//     transform: `scale(${scale})`,
//     transformOrigin: "top center",
//     backgroundColor: "white",
//     boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="flex flex-col items-center gap-8 w-full h-full overflow-auto"
//     >
//       {/* Hidden measuring container */}
//       <div
//         ref={contentRef}
//         style={{
//           position: "absolute",
//           visibility: "hidden",
//           width: A4_WIDTH,
//           pointerEvents: "none",
//         }}
//       >
//         {sections.map(({ key, title, number }) => (
//           <PreviewCard
//             key={key}
//             data={data[key]}
//             title={title}
//             number={number}
//           />
//         ))}
//       </div>

//       {/* Page 1 */}
//       <div style={pageStyle} className="px-8 py-5 text-xs">
//         <div className="grid grid-cols-[1fr_2fr_1fr] text-center">
//           <img src={logo} className="h-12" />
//           <h1 className="font-semibold text-sm">{setControlType(page)}</h1>
//           <div className="text-xs flex flex-col items-start">
//             <p>{userSettings?.company}</p>
//             <p>{userSettings?.address}</p>
//             <p>
//               {userSettings?.postalCode} {userSettings?.city}
//             </p>
//             <br />
//             <p>{userSettings?.email}</p>
//             <p>{userSettings?.phone}</p>
//           </div>
//         </div>
//         <div className="grid grid-cols-2">
//           <PreviewCard data={data["Kunduppgifter"]} className="" />
//           <PreviewCard data={data["Kontaktuppgifter"]} className="" />
//         </div>
//         <LineBreak />
//         {(pageChunks[0] ?? sections.map((_, i) => i)).map((i) => {
//           const { key, title, number } = sections[i];
//           return (
//             <PreviewCard
//               key={key}
//               data={data[key]}
//               title={title}
//               number={number}
//             />
//           );
//         })}
//       </div>

//       {/* Overflow pages */}
//       {pageChunks.slice(1).map((chunk, pageIndex) => (
//         <div key={pageIndex} style={pageStyle} className="px-8 py-5 text-xs">
//           {chunk.map((i) => {
//             const { key, title, number } = sections[i];
//             return (
//               <PreviewCard
//                 key={key}
//                 data={data[key]}
//                 title={title}
//                 number={number}
//               />
//             );
//           })}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Preview;
