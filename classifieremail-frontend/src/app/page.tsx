"use client";

import React from "react";
import Card from "@/core/components/Card";
import Link from "next/link";
import { Github } from "lucide-react";

export default function Homepage() {
  const navStyle = "bg-gray-200/80 hover:bg-gray-200/50 text-gray-950 font-bold p-3 xs:p-4 rounded-2xl";

  return (
    <div className="h-full">
      <Card
        title={"Bem-vindo ao Classifier E-mail"}
        content={"Sua solução inteligente para organização e classificação de e-mails."}
      >
        <div className="text-gray-300 text-sm xs:text-base leading-relaxed py-6 px-6 bg-gray-950/30 rounded-2xl shadow-2xl shadow-gray-950/60">
          <h1 className="flex text-center text-xl font-bold justify-center mb-2">Sobre o projeto</h1>

          <p className="mb-4">
            O <strong>Classifier E-mail</strong> é uma solução desenvolvida para otimizar a gestão da sua caixa de
            entrada, tornando a organização e a busca por informações muito mais ágeis e inteligentes.
          </p>

          <p className="mb-4">
            Com o uso de <strong>inteligência artificial</strong>, nossa ferramenta não apenas analisa e classifica seus
            e-mails em <strong>produtivos</strong> ou <strong>improdutivos</strong>, mas também identifica{" "}
            <strong>palavras-chave (NLP)</strong>, sugere <strong>respostas recomendadas</strong> e apresenta o{" "}
            <strong>motivo da avaliação</strong>.
          </p>
          <p className="mb-4">
            Você pode testar facilmente enviando arquivos (PDF/TXT) ou preenchendo um formulário interativo.
          </p>
          <p>
            Ganhe tempo, aumente sua produtividade e mantenha sua caixa de entrada organizada com apenas alguns cliques.
            <strong> Experimente agora e veja a diferença que a IA pode fazer na sua rotina!</strong>
          </p>

          <div className="flex flex-row flex-1 pt-6 items-center justify-center gap-4">
            <Link href={"/emailform"} className={navStyle}>
              Preencha o Formulário
            </Link>
            <h1>ou</h1>
            <Link href={"/emailfile"} className={navStyle}>
              Faça o envio do arquivo
            </Link>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-2 mt-8 text-sm text-gray-500">
          <p className="text-gray-400">Desenvolvido por Gabriel Oliveira</p>
          <span className="border-r border-gray-600 h-4" />
          <Link
            href={"https://github.com/edgabrieloliveira"}
            className="flex items-center gap-1 bg-gray-900 hover:bg-gray-950/60 hover:scale-95 p-1 px-2 rounded-xl"
          >
            <Github size={20} className="bg-gray-950 text-white p-1 rounded-full" />
            GitHub
          </Link>
        </div>
      </Card>
    </div>
  );
}
