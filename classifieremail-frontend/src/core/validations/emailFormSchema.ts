import * as yup from "yup";

export const formSchema = yup.object().shape({
  remetente: yup.string().email("Email inválido").required("Email é obrigatório"),
  assunto: yup.string().min(2, "Assunto muito curto").max(100, "Assunto muito longo").required("Assunto é obrigatório"),
  descricao: yup
    .string()
    .min(10, "Descrição muito curta")
    .max(1000, "Descrição muito longa")
    .required("Descrição é obrigatória"),
});
