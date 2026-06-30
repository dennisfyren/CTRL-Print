import React, { useState } from "react";
import Brandlarm from "./Brandlarm";
import Inbrottslarm from "./Inbrottslarm";
import CE from "./CE";
import Preview from "./Preview";
import Button from "../components/Button";
import { useDataContext } from "../hooks/DataContext";
import { Pen, Trash } from "lucide-react";

function Protocol({ page, userSettings, setOpen }) {
  const { setData } = useDataContext();
  const [openModal, setOpenModal] = useState(false);

  function resetData() {
    setOpenModal((prev) => !prev);
  }

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 h-full animate-fade-in">
      <div className="relative 2xl:border-r border-gray-300 dark:border-main-gray-hover py-10 overflow-y-scroll no-scrollbar">
        {page === "fire" && <Brandlarm userSettings={userSettings} />}
        {page === "breakin" && <Inbrottslarm userSettings={userSettings} />}
        {/* {page === "ce" && <CE />} */}
      </div>
      <div className="relative p-10 hidden 2xl:block overflow-scroll no-scrollbar">
        <Preview userSettings={userSettings} page={page} setOpen={setOpen} />
      </div>
      <Button
        label="Reset"
        className="fixed 2xl:hidden bottom-4 left-4 h-12 w-40 bg-red-500 hover:bg-red-700 z-20"
        handleClick={() => setOpenModal((prev) => !prev)}
        Logo={Trash}
      />
      <Button
        label={"Förhandsgranska"}
        className="2xl:hidden bg-blue-500 hover:bg-blue-600 h-12 w-40 fixed right-4 bottom-4 z-20"
        handleClick={() => {
          setOpen("preview");
        }}
      />
      {openModal && (
        <div
          className="fixed inset-0 z-200 flex items-center justify-center bg-black/50"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="flex flex-col bg-main-bg dark:bg-main-bg-dark dark:text-main-text p-6 rounded-lg shadow-xl text-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p>Detta kommer att radera all data</p>
            <div className="flex flex-col gap-4 items-center">
              <Button
                label={"Reset"}
                className="w-40 bg-red-500 hover:bg-red-600"
                handleClick={() => {
                  setData({});
                  setTimeout(() => {
                    setOpenModal((prev) => !prev);
                  }, 250);
                }}
              />
              <Button
                label={"Tillbaka"}
                className="w-40 bg-gray-500 hover:bg-gray-600"
                handleClick={() => setOpenModal((prev) => !prev)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Protocol;
