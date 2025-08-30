"use client";

import React from "react";
import { EmailResult } from "../../core/types/email.types";
import Button from "../../core/components/Button";
import Card from "../../core/components/Card";
import Loading from "../../core/components/Loading";
import { Download, Upload, X } from "lucide-react";
import EmailResultCard from "../../core/components/EmailResultCard";
import { fileSchema } from "@/core/validations/emailFileSchema";
import { emailFilePDFRouter, emailFileTXTRouter } from "@/core/routers/emailFile.router";

export default function EmailFilterFile() {
  const [step, setStep] = React.useState(0);
  const [file, setFile] = React.useState<File | null>(null);
  const [result, setResult] = React.useState<EmailResult>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>("");

  const steps = React.useMemo(
    () => [
      {
        label: "PDF",
        color: "border-red-500 text-red-400 bg-gray-900",
        buttonColor: "bg-red-500 hover:bg-red-600",
        resultBorder: "border-red-700",
        resultText: "text-red-400",
        accept: "application/pdf",
        handler: emailFilePDFRouter,
        inputLabel: "Selecione um arquivo PDF",
      },
      {
        label: "TXT",
        color: "border-blue-500 text-blue-400 bg-gray-900",
        buttonColor: "bg-blue-500 hover:bg-blue-600",
        resultBorder: "border-blue-700",
        resultText: "text-blue-400",
        accept: ".txt,text/plain",
        handler: emailFileTXTRouter,
        inputLabel: "Selecione um arquivo TXT",
      },
    ],
    [],
  );

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!file) {
        setError(`Selecione um arquivo ${steps[step].label}.`);
        return;
      }

      setError("");
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);
        const resultData: EmailResult = await steps[step].handler(formData);
        setResult(resultData);
      } catch (err: unknown) {
        setError((err as Error).message || `Erro ao enviar ${steps[step].label}`);
      } finally {
        setLoading(false);
      }
    },
    [file, step, steps],
  );

  const handleFileChange = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0] || null;

      try {
        await fileSchema(step).validate({ file: selectedFile });
        setFile(selectedFile);
        setError("");
      } catch (err: unknown) {
        setFile(null);
        setError(err instanceof Error ? err.message : "Erro ao validar arquivo.");
      }
    },
    [step],
  );

  const handleStepChange = React.useCallback((newStep: number) => {
    setStep(newStep);
    setFile(null);
    setError("");
  }, []);

  const handleBack = React.useCallback(() => {
    setResult(undefined);
    setFile(null);
    setError("");
    setLoading(false);
    setStep(0);
  }, []);

  const handleRemoveFile = React.useCallback(() => {
    setFile(null);
    setError("");
  }, []);

  const currentStep = steps[step];

  return (
    <>
      <Card title="Classificação por arquivo" content="Faça upload do seu arquivo em formato PDF ou TXT.">
        <div className="space-y-4 xs:space-y-6">
          {!result && !loading && (
            <div className="flex justify-center">
              <div className="flex gap-1 xs:gap-2 bg-gray-800 p-1 rounded-lg w-full xs:w-auto">
                {steps.map((tab, index) => (
                  <button
                    key={tab.label}
                    type="button"
                    className={`flex-1 xs:flex-none px-3 xs:px-4 py-2 font-semibold transition-all rounded-md focus:outline-none text-xs xs:text-sm ${
                      step === index ? `${tab.color}` : "text-gray-400 hover:text-gray-200"
                    }`}
                    onClick={() => handleStepChange(index)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && !result && (
            <div className="flex justify-center py-6 xs:py-8">
              <Loading />
            </div>
          )}

          {result && !loading && <EmailResultCard result={result} loading={loading} onBack={handleBack} />}

          {!loading && !result && (
            <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-6">
              <div className="space-y-3 xs:space-y-4">
                <label className="block text-white font-semibold text-center text-sm xs:text-base lg:text-lg">
                  {currentStep.inputLabel}
                </label>

                <div className="flex flex-col gap-2 w-full">
                  <div className="relative flex-1">
                    <input
                      type="file"
                      accept={currentStep.accept}
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      id="file-input"
                    />
                    <label
                      htmlFor="file-input"
                      className={`${currentStep.buttonColor} flex items-center justify-center w-full px-3 xs:px-4 py-2 xs:py-3 rounded-lg text-white font-semibold cursor-pointer shadow-md transition-colors hover:shadow-lg text-sm xs:text-base`}
                    >
                      {file ? (
                        <Download className="w-3 h-3 xs:w-4 xs:h-4 mr-2" />
                      ) : (
                        <Upload className="w-3 h-3 xs:w-4 xs:h-4 mr-2" />
                      )}
                      {file ? "Trocar arquivo" : "Selecionar arquivo"}
                    </label>
                  </div>

                  {file && (
                    <div className="flex items-center gap-2 bg-gray-800 px-3 xs:px-4 py-2 xs:py-3 rounded-lg min-h-[40px] xs:min-h-[48px]">
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-300 text-xs xs:text-sm truncate" title={file.name}>
                          {file.name}
                        </p>
                        <p className="text-gray-500 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button
                        type="button"
                        className="flex items-center justify-center p-1 xs:p-2 bg-gray-700 hover:bg-red-600 rounded-md transition-colors"
                        onClick={handleRemoveFile}
                        aria-label="Remover arquivo"
                      >
                        <X className="w-3 h-3 xs:w-4 xs:h-4 text-gray-400 hover:text-white" />
                      </button>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-2 xs:p-3">
                    <p className="text-red-400 text-xs xs:text-sm text-center">{error}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  variant="success"
                  className="w-full xs:w-auto px-6 xs:px-8 text-sm xs:text-base"
                  nome="Enviar arquivo"
                  disabled={loading || !file}
                />
              </div>
            </form>
          )}
        </div>
      </Card>
    </>
  );
}
