"use client";
import React from "react";
import { Menu, X } from "lucide-react";

const urlList = [
  { label: "Inicio", url: "/" },
  { label: "Classificar por Arquivo", url: "/emailfile" },
  { label: "Classificar por Formulário", url: "/emailform" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="flex flex-col lg:flex-row max-w-3xl px-8 mx-auto items-center rounded-2xl font-sans justify-between w-full bg-gray-950/30 text-white p-3 xs:p-4 backdrop-blur-lg">
      <div className="flex justify-between items-center w-full lg:w-auto">
        <h1 className="text-base xs:text-lg lg:text-xl font-bold">Classifier E-mail</h1>
        <button
          className="lg:hidden p-2 hover:bg-gray-800 bg-gray-950/50 rounded-md transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <nav className={`${isMenuOpen ? "block" : "hidden"} lg:block w-full lg:w-auto mt-4 lg:mt-0`}>
        <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 xl:space-x-6">
          {urlList.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                className="block px-3 py-2 lg:px-0 lg:py-0 text-sm xs:text-base hover:underline hover:underline-offset-4 decoration-gray-200/30 decoration-2 hover:bg-gray-800  lg:hover:bg-transparent rounded-md lg:rounded-none transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
