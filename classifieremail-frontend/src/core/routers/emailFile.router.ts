import { EmailResult } from "../types/email.types";

export const emailFilePDFRouter = async (formData: FormData): Promise<EmailResult> => {
  const response = await fetch("/api/email/pdf", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Erro ao processar PDF");
  }

  return response.json();
};

export const emailFileTXTRouter = async (formData: FormData): Promise<EmailResult> => {
  const response = await fetch("/api/email/txt", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Erro ao processar TXT");
  }

  return response.json();
};
