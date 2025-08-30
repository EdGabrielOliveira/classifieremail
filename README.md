# ClassifierEmail

Plataforma para classificar e-mails corporativos como Produtivos ou Improdutivos, atribuir um rating e fornecer um
motivo textual detalhado. Também sugere automaticamente uma resposta ao e-mail. O sistema extrai texto de arquivos
(PDF/TXT) e usa um pipeline de NLP para preparar e estruturar o conteúdo para o modelo de IA (limpeza, normalização,
extração de sinais) e gerar métricas/atributos exibidos apenas como informação adicional ao usuário. A decisão de
classificação e a sugestão de resposta combinam as diretrizes + saída da IA, com fallback heurístico quando necessário.

## Projeto em produção

Acesse o link para ver o funcionamento do projeto.

### https://classifieremail.vercel.app/

## Principais Funcionalidades

- Classificação binária garantida: Produtivo ou Improdutivo
- Atribuição de rating (0–10) coerente com o contexto
- Motivo textual detalhado para cada decisão
- Sugestão automática de resposta ao e-mail
- Extração de texto de arquivos PDF e TXT
- Pipeline de NLP para limpeza, normalização e enriquecimento dos dados
- Exibição de métricas e atributos informativos ao usuário
- Fallback heurístico local caso a IA não responda

Este README raiz é intencionalmente simples. Caso queira detalhes técnicos (endpoints, variáveis, fluxo interno,
heurísticas, etc.), acesse os READMEs dentro de cada pasta:

- `classifieremail-backend/README.md`
- `classifieremail-frontend/README.md`

## Como Funciona (Visão Simplificada)

1. O usuário informa o conteúdo do e-mail (texto direto ou upload de arquivo).
2. O backend extrai/limpa o texto e executa um pipeline básico de NLP.
3. Gera um prompt com diretrizes de classificação e consulta um modelo de IA.
4. A resposta da IA é validada (garante sempre uma das duas classes + rating + motivo + sugestão de resposta).
5. O frontend exibe o resultado e permite copiar a sugestão de resposta.
6. Se a IA falhar, uma heurística local decide a classificação.

## Tecnologias Usadas

Backend:

- Python (FastAPI, Pydantic)
- NLP: NLTK
- Extração de PDF: PyMuPDF (fitz), pdfplumber, fallback OCR (pytesseract + Pillow)
- Integração de IA via OpenRouter (modelo GPT-4o Mini)

Frontend:

- Next.js (App Router) / React com TypeScript
- Tailwind CSS
- Yup (validação)

## Objetivo

Reduzir tempo de triagem e resposta a e-mails, priorizando comunicações relevantes e automatizando rascunhos de retorno.

## Analise de custo

A estimativa de custo foi calculada com base na média de 10 requisições. Utilizando o modelo atual, o custo aproximado é
de apenas 270 dólares para cada 1 milhão de requisições. Isso significa que uma empresa pode receber e analisar mil
e-mails por dia durante mil dias — cerca de 33 meses — com um investimento muito baixo.

## Estrutura Básica

```
classifieremail-backend/   # API e processamento
classifieremail-frontend/  # Interface web
```

## Onde Ver Mais

Abra cada subpasta para instruções completas de instalação, execução local, endpoints e variáveis de ambiente.
