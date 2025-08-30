import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-t-gray-950/30 border-gray-400 rounded-full animate-spin" />
      <div className="flex flex-col text-center">
        <h1 className="text-white font-semibold">Processando</h1>
        <p className="text-gray-400 text-sm">Aguarde enquanto processamos sua solicitação.</p>
      </div>
    </div>
  );
}
