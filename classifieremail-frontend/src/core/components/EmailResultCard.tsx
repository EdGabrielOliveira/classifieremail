"use client";
import React from "react";
import { EmailResult } from "../types/email.types";
import Button from "./Button";
import CopyButton from "./CopyButton";
import { ChevronDown } from "lucide-react";

interface EmailResultCardProps {
  result: EmailResult;
  loading?: boolean;
  onBack: () => void;
}

export default function EmailResultCard({ result, loading = false, onBack }: EmailResultCardProps) {
  const [openNLP, setOpenNLP] = React.useState(false);

  const handleOpenNLP = () => setOpenNLP((prev) => !prev);

  if (!result || loading) return null;

  return (
    <div className="flex flex-col items-center justify-center space-y-3 xs:space-y-4">
      <div className="p-3 xs:p-4 lg:p-6 border border-blue-700 rounded-xl bg-gray-900/80 text-white shadow-lg w-full">
        <h2 className="text-base xs:text-lg lg:text-xl font-bold mb-3 xs:mb-4 text-blue-400 text-center">Resultado</h2>
        <div className="space-y-2 xs:space-y-3">
          <div className="flex flex-col gap-2 xs:gap-3 text-xs xs:text-sm lg:text-base">
            <div className="flex justify-between w-full">
              <p
                className={`break-words ${
                  result.classificacao === "Improdutivo" || result.classificacao === "IMPRODUTIVO"
                    ? "bg-red-700 p-2 rounded-xl"
                    : result.classificacao === "Produtivo" || result.classificacao === "PRODUTIVO"
                    ? "bg-green-700 p-2 rounded-xl"
                    : result.classificacao !== "Produtivo" && result.classificacao !== "Improdutivo"
                    ? "bg-yellow-600 p-2 rounded-xl"
                    : ""
                }`}
              >
                <strong>Classificação:</strong> {result.classificacao}
              </p>
              <p
                className={
                  result.rating >= "7"
                    ? "bg-green-800 p-2 rounded-xl"
                    : result.rating >= "4"
                    ? "bg-yellow-600 p-2 rounded-xl"
                    : result.rating >= "0"
                    ? "bg-red-700 p-2 rounded-xl"
                    : "bg-gray-700 p-2 rounded-xl"
                }
              >
                <strong>Rating:</strong> {result.rating}
              </p>
            </div>
            <p className="sm:col-span-2">
              <strong>Motivo:</strong> {result.motivo}
            </p>
          </div>

          {result.nlp_features && (
            <div className="bg-gray-800/50 rounded-lg p-3 xs:p-4 space-y-2">
              <div className="flex flex-row items-baseline-last justify-between w-full">
                <p className="font-semibold text-xs xs:text-sm text-gray-300 mb-2">Análise NLP</p>
                <button
                  onClick={handleOpenNLP}
                  className="flex flex-row items-center justify-center gap-1 text-gray-400 hover:text-gray-200 text-xs xs:text-sm font-medium"
                >
                  <ChevronDown className={`${openNLP ? "rotate-180" : ""} transition-transform`} /> Ver estatísticas
                </button>
              </div>
              {openNLP && (
                <div className="flex flex-col gap-2 text-xs">
                  <div className="grid grid-cols-3 gap-2 xs:gap-3 flex-1">
                    <div className="text-blue-300 flex items-center gap-1">
                      <span className="font-medium">🔤 Palavras:</span> {result.nlp_features.word_count}
                    </div>
                    <div className="text-blue-300 flex items-center gap-1">
                      <span className="font-medium">📝 Frases:</span> {result.nlp_features.sentence_count}
                    </div>
                    <div className="text-blue-300 flex items-center gap-1">
                      <span className="font-medium">📏 Tam. médio:</span>{" "}
                      {result.nlp_features.avg_word_length.toFixed(1)}
                    </div>
                    <div className="text-purple-300 flex items-center gap-1">
                      <span className="font-medium">🔠 Maiúsculas:</span>{" "}
                      {(result.nlp_features.uppercase_ratio * 100).toFixed(1)}%
                    </div>
                    {result.nlp_features.question_marks > 0 && (
                      <div className="text-green-400 flex items-center gap-1">
                        <span className="font-medium">❓ Perguntas:</span> {result.nlp_features.question_marks}
                      </div>
                    )}
                    {result.nlp_features.exclamation_marks > 0 && (
                      <div className="text-red-400 flex items-center gap-1">
                        <span className="font-medium">❗ Exclamações:</span> {result.nlp_features.exclamation_marks}
                      </div>
                    )}
                    {result.nlp_features.spelling_errors > 0 && (
                      <div className="text-orange-400 flex items-center gap-1">
                        <span className="font-medium">🟠 Erros ortográficos:</span>{" "}
                        {result.nlp_features.spelling_errors}
                      </div>
                    )}
                  </div>

                  {typeof result.quality_score === "number" && (
                    <div className="pt-2 border-t border-gray-700">
                      <span className="text-gray-300 text-xs font-medium">Score de qualidade: </span>
                      <span className="text-blue-400 font-semibold">{result.quality_score}/10</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="rounded-lg p-3 xs:p-4 bg-gray-800">
            <p className="mb-2 font-semibold text-xs xs:text-sm">Resposta Sugerida:</p>
            <p className="whitespace-pre-line break-words text-xs xs:text-sm lg:text-base leading-relaxed">
              {result.resposta_sugerida}
            </p>
            <div className="flex justify-end mt-2 xs:mt-3">
              <CopyButton text={result.resposta_sugerida} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          nome="Voltar"
          variant="secondary"
          className="w-full xs:w-auto px-6 xs:px-8 text-sm xs:text-base"
          type="button"
          onClick={onBack}
        />
      </div>
    </div>
  );
}
