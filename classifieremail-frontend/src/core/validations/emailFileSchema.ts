import * as yup from "yup";

export const fileSchema = (step: number) => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const allowedTypes = step === 0 ? ["application/pdf"] : ["text/plain"];
  const fileTypeMessage =
    step === 0 ? "Tipo de arquivo inválido. Selecione um PDF." : "Tipo de arquivo inválido. Selecione um TXT.";

  return yup.object({
    file: yup
      .mixed()
      .required("Arquivo é obrigatório")
      .test("fileType", fileTypeMessage, (value) => {
        if (!value) return false;
        const file = value as File;
        return allowedTypes.includes(file.type) || (step === 1 && file.name.endsWith(".txt"));
      })
      .test("fileSize", "Arquivo muito grande. O limite é 5MB.", (value) => {
        if (!value) return false;
        const file = value as File;
        return file.size <= MAX_FILE_SIZE;
      }),
  });
};
