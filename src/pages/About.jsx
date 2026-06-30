import React from "react";
import LineBreak from "../components/LineBreak";
import { ExternalLink, Link } from "lucide-react";

function About() {
  return (
    <div className="dark:text-main-text flex flex-col gap-3 h-full relative animate-fade-in">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Vad är CTRL+Print?</h2>
        <p className="leading-relaxed">
          CTRL+Print är en app för att skriva provningsprotokoll.
          <br /> Tanken bakom appen är att på ett enklare sätt kunna skriva ett
          protokoll och få ut en PDF fil som man sedan kan lagra på valfri
          plats.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">
          Varför har jag utvecklat appen?
        </h2>
        <p className="leading-relaxed">
          Jag har skrivit många provningsprotokoll, både på bra och dåliga sätt.
          Ibland vill man ha ett lättare sätt att göra saker så då har jag
          utvecklat min egen lösning för detta.
        </p>
      </div>
      <LineBreak />
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Hittat några problem?</h2>
        <p className="leading-relaxed">
          Skriv ett mail till mig så åtgärdar jag det så snabbt som möjligt.
        </p>
      </div>
      <p className="absolute bottom-1 left-2">Current version: 0.5</p>
      <a
        className="absolute bottom-1 right-2"
        href="https://github.com/dennisfyren"
        target="_blank"
      >
        <div className="flex items-center gap-1">
          <ExternalLink size={16} />
          <p>dennisfyren</p>
        </div>
      </a>
    </div>
  );
}

export default About;
