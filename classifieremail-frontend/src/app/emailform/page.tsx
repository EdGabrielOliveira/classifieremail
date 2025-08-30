"use client";
import React from "react";
import * as yup from "yup";
import { EmailResult } from "../../core/types/email.types";
import Button from "../../core/components/Button";
import Input from "../../core/components/Input";
import Card from "../../core/components/Card";
import Loading from "../../core/components/Loading";
import { ChevronDown } from "lucide-react";
import EmailResultCard from "../../core/components/EmailResultCard";
import { formSchema } from "@/core/validations/emailFormSchema";
import { emailFormRouter } from "@/core/routers/emailForm.router";

export default function EmailFilterForm() {
  const [remetente, setRemetente] = React.useState("");
  const [assunto, setAssunto] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [result, setResult] = React.useState<EmailResult>();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [openFunctions, setOpenFunctions] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      await formSchema.validate({ remetente, assunto, descricao }, { abortEarly: false });
      const resultData = await emailFormRouter({ remetente, assunto, descricao });
      setResult(resultData);
      if (resultData?.classificacao) {
        setErrors({});
      } else {
        setErrors({ geral: "Erro ao classificar e-mail." });
      }
    } catch (err: unknown) {
      if (err instanceof yup.ValidationError) {
        const formErrors: { [key: string]: string } = {};
        err.inner.forEach((e: unknown) => {
          if (e instanceof yup.ValidationError) {
            if (e.path) {
              formErrors[e.path] = e.message;
            }
          }
        });
        setErrors(formErrors);
      } else {
        setErrors({ geral: (err as Error).message });
      }
    } finally {
      setLoading(false);
    }
  };

  const limparCampos = () => {
    setRemetente("");
    setAssunto("");
    setDescricao("");
    setErrors({});
  };

  const handleBack = () => {
    setResult(undefined);
    setErrors({});
    setRemetente("");
    setAssunto("");
    setDescricao("");
  };

  const handleOpenFunctions = () => {
    setOpenFunctions((prev) => !prev);
  };

  const handleAplicarProdutivo = () => {
    setRemetente("gabriel@empresa.com");
    setAssunto("Preciso com ajuda com bugs no deploy da aplicação");
    setDescricao(
      "Estou enfrentando dificuldades com o deploy da aplicação e preciso de ajuda. Quero marcar uma reunião para discutir isso o mais rápido possível.",
    );
  };

  const handleAplicarImprodutivo = () => {
    setRemetente("joao@empresa.com");
    setAssunto("Convite para happy hour");
    setDescricao(
      "Olá equipe! Estou organizando um happy hour hoje após o expediente. Quem quiser participar, será muito bem-vindo. Vamos relaxar e conversar!",
    );
  };

  return (
    <>
      <Card title={"Classificação de E-mails"} content={"Preencha os campos abaixo para classificar o e-mail."}>
        <div className="space-y-4 xs:space-y-6">
          {loading && !result && (
            <div className="flex justify-center py-6 xs:py-8">
              <Loading />
            </div>
          )}

          {result && !loading && <EmailResultCard result={result} loading={loading} onBack={handleBack} />}

          {!loading && !result && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 xs:gap-4">
              {errors.geral && (
                <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-2 xs:p-3">
                  <p className="text-red-400 text-xs xs:text-sm text-center">{errors.geral}</p>
                </div>
              )}

              <div>
                <Input
                  label="E-mail"
                  type="email"
                  placeholder="Digite o e-mail do remetente"
                  value={remetente}
                  onChange={(e) => setRemetente(e.target.value)}
                  className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                {errors.remetente && (
                  <span className="text-red-400 text-xs xs:text-sm mt-1 block">{errors.remetente}</span>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Digite o assunto recebido"
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                  label="Assunto"
                />
                {errors.assunto && <span className="text-red-400 text-xs xs:text-sm mt-1 block">{errors.assunto}</span>}
              </div>

              <div>
                <Input
                  isTextArea
                  placeholder="Digite a mensagem recebida"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  label="Descrição"
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.descricao && <span className="text-red-400 text-xs xs:text-sm">{errors.descricao}</span>}
                  <span className="text-gray-400 text-xs ml-auto">{descricao.length} / 1000 caracteres</span>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  variant="success"
                  className="w-full xs:w-auto px-6 xs:px-8 text-sm xs:text-base"
                  nome={loading ? "Enviando..." : "Enviar dados"}
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-3 xs:gap-4 mt-4 xs:mt-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm xs:text-base lg:text-lg font-semibold text-white text-center">
                    Funções rápidas
                  </h2>
                  <div>
                    <button
                      onClick={handleOpenFunctions}
                      type="button"
                      className="flex flex-row items-center justify-center gap-1 text-gray-400 hover:text-gray-200 text-xs xs:text-sm font-medium"
                    >
                      <ChevronDown className={`${openFunctions ? "rotate-180" : ""} transition-transform`} /> Ver
                      funções
                    </button>
                  </div>
                </div>
                {openFunctions && (
                  <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
                    <Button
                      nome="Limpar Campos"
                      variant="secondary"
                      type="button"
                      onClick={limparCampos}
                      className="flex-1 text-xs xs:text-sm"
                    />
                    <Button
                      nome="Formulário Produtivo"
                      variant="secondary"
                      type="button"
                      onClick={handleAplicarProdutivo}
                      className="flex-1 text-xs xs:text-sm"
                    />
                    <Button
                      nome="Formulário Improdutivo"
                      variant="secondary"
                      type="button"
                      onClick={handleAplicarImprodutivo}
                      className="flex-1 text-xs xs:text-sm"
                    />
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </Card>
    </>
  );
}
