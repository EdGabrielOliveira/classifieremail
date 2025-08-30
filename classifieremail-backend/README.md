# ClassifierEmail Backend

API para classificação corporativa de e-mails, extração de texto (PDF/TXT), processamento NLP e geração assistida de
resposta usando modelo de IA via OpenRouter.

## Funcionalidades

- Classificação binária: Produtivo ou Improdutivo (sempre retorna uma das duas)
- Rating (0–10) coerente com a classificação
- Motivo textual sempre presente
- Sugestão automática de resposta
- Extração de texto de:
  - JSON (campos remetente, assunto, descrição)
  - PDF (PyMuPDF, pdfplumber, fallback OCR com Tesseract se disponível)
  - TXT
- Processamento NLP (tokenização, limpeza, contagem, score de qualidade)
- Integração com modelo de IA (prompt + contexto NLP)
- Fallback interno se a IA falhar (heurística local)
- Suporte CORS para consumo pelo frontend
- Autenticação por API Key simples (header: `x-api-key`)

## Tecnologias Utilizadas

- **Python 3.10+**
- **FastAPI** (framework web)
- **Uvicorn** (ASGI server)
- **Pydantic** (modelos e validação)
- **python-dotenv** (carregamento de variáveis)
- **Requests** (requisições HTTP para IA)
- **nltk** (tokenização, stopwords, stemming)
- **PyMuPDF (fitz)** e **pdfplumber** (leitura PDF)
- **Pillow** + **pytesseract** (OCR)
- **CORSMiddleware** (acesso cross-origin)

## Estrutura do Projeto (simplificada)

```
classifieremail-backend/
  main.py                  # Definição FastAPI, rotas e integração IA
  nlp_processor.py         # Classe EmailNLPProcessor (pipeline NLP)
  diretrizes.txt           # Prompt / regras de classificação
  requirements.txt
  Procfile
  runtime.txt
  README.md
  .env (não versionar)
```

## Endpoints

| Método | Rota           | Descrição                                  |
| ------ | -------------- | ------------------------------------------ |
| POST   | /classemail    | Corpo JSON (remetente, assunto, descricao) |
| POST   | /classemailpdf | Upload PDF (`file`)                        |
| POST   | /classemailtxt | Upload TXT (`file`)                        |

Resposta (modelo padrão):

```
{
  "classificacao": "Produtivo" | "Improdutivo",
  "rating": "8/10",
  "motivo": "...",
  "resposta_sugerida": "...",
  "nlp_features": { ... },
  "quality_score": 7.5
}
```

Sempre garante: campos presentes + uma das duas classes.

## Lógica de Classificação (Resumo Diretrizes)

Produtivo (6–10):

- Solicitações, dúvidas técnicas legítimas
- Erros de build / incidentes operacionais (exigem ação)
- Clientes, parceiros, fornecedores relevantes
- Funcionários pedindo aprovação, recurso, suporte
- Currículos e oportunidades de contratação
- Autoridades / obrigações legais
- Comunicação urgente com impacto operacional ou comercial

Improdutivo (0–5):

- Spam, phishing, anúncios genéricos
- Promoções não solicitadas
- Convites irrelevantes
- Mensagens vagas sem ação necessária
- Newsletters genéricas de marketing sem relação direta
- Conteúdo motivacional / corrente

Fallback heurístico (se IA falha):

- Palavras-chave de erro / incident / deploy / build → Produtivo
- Palavras de promoção / oferta / desconto → Improdutivo
- Default seguro baseado em densidade de termos técnicos e presença de verbo de ação.

## Variáveis de Ambiente (.env)

## AVISO: Acesso apenas para rodar local, chaves sem acesso ao projeto principal.

```
SECRET_API_KEY=2118AEFCFF48F2F4B82D627B75673
OPENROUTER_API_KEY=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
MODEL_AI_API=openai/gpt-4o-mini-2024-07-18
OPENROUNTER_URL=https://openrouter.ai/api/v1/chat/completions
```

## Execução Local

1. Criar e ativar ambiente (opcional):
   ```
   python -m venv .venv
   source .venv/bin/activate  (Linux/Mac)
   .venv\Scripts\activate     (Windows)
   ```
2. Instalar dependências:
   ```
   pip install -r requirements.txt
   ```
3. Criar `.env` (ver seção anterior).
4. Rodar:
   ```
   fastapi run main.py
   ```

## Tratamento de PDFs

Ordem:

1. PyMuPDF (rápido)
2. pdfplumber (melhora layout)
3. OCR (Tesseract) se texto quase vazio

## Sobre o Motor de IA

O projeto utiliza o modelo GPT-4o Mini para análise e classificação dos e-mails, garantindo precisão e rapidez nas
respostas.
