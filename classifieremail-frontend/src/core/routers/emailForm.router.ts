import { EmailResult } from "../types/email.types";

type EmailFormData = {
  remetente: string;
  assunto: string;
  descricao: string;
};

export const emailFormRouter = async (data: EmailFormData): Promise<EmailResult> => {
  const response = await fetch("/api/email/form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Erro ao processar formulário");
  }

  return response.json();
};
