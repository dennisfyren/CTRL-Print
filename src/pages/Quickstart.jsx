import { Settings } from "lucide-react";
import React from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import GeneralCard from "../components/GeneralCard";

function Quickstart({ userSettings, setOpen }) {
  function handleClick(page) {
    setOpen(page);
  }
  return (
    <div className="flex flex-col animate-fade-in px-10 h-full">
      <div className="flex flex-col py-10">
        {userSettings.logo && (
          <img className="w-60 mb-8" src={userSettings.logo}></img>
        )}
        <p className="text-2xl dark:text-main-text font-semibold tracking-wider">
          {userSettings?.name
            ? `Välkommen tillbaka, ${userSettings.name}!`
            : `Välkommen, gå till inställningar för att komma igång!`}
        </p>
        {!userSettings.name && (
          <Button
            label={"Inställningar"}
            Logo={Settings}
            className="bg-main-orange hover:bg-main-orange-hover w-50 h-12 mt-5"
            handleClick={() => handleClick("settings")}
          />
        )}
      </div>
      {userSettings.name && (
        <div className="flex flex-col lg:flex-row gap-6 ">
          <Card
            label={"Brandlarm"}
            className="bg-gray-200 dark:bg-main-gray-hover"
            handleClick={() => handleClick("fire")}
          />
          <Card
            label={"Inbrottslarm"}
            className="bg-gray-200 dark:bg-main-gray-hover"
            handleClick={() => handleClick("breakin")}
          />
          {/* <Card
            label={"CE-Märkning"}
            className="bg-gray-200 dark:bg-main-gray-hover"
            handleClick={() => handleClick("ce")}
          /> */}
        </div>
      )}
      {/* {userSettings.name && (
        <div className="flex mt-auto mb-5">
          <GeneralCard
            label={"Hantera Kunder"}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-700"
            handleClick={() => handleClick("customers")}
          />
        </div>
      )} */}
    </div>
  );
}

export default Quickstart;
