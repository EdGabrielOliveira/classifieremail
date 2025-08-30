export type EmailResult = {
  classificacao: string;
  rating: string;
  motivo: string;
  resposta_sugerida: string;
  nlp_features?: {
    word_count: number;
    sentence_count: number;
    avg_word_length: number;
    question_marks: number;
    exclamation_marks: number;
    uppercase_ratio: number;
    spelling_errors: number;
  };
  quality_score?: number;
};
