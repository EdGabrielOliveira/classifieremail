# ClassifierEmail Frontend

Plataforma web para classificação automática de e-mails, análise de estatísticas NLP e sugestão de respostas, utilizando
inteligência artificial (GPT-4o Mini).

## Funcionalidades

- Classificação de e-mails por texto ou arquivo (PDF/TXT)
- Exibição de estatísticas NLP destacadas
- Sugestão automática de resposta
- Interface responsiva e otimizada para UX
- Integração segura com backend via API

## Tecnologias Utilizadas

- **Next.js** (App Router)
- **React** (TypeScript)
- **Tailwind CSS** (estilização e responsividade)
- **Yup** (validação de formulários)
- **Lucide React** (ícones)

## Estrutura do Projeto

```
src/
  app/
    page.tsx            # Página inicial
    emailform/page.tsx  # Formulário de texto
    emailfile/page.tsx  # Upload de arquivo
    api/email/          # Rotas de API (form, pdf, txt)
    layout.tsx          # Layout base
    globals.css         # Estilos globais
  core/
    components/         # Componentes reutilizáveis
      Card.tsx
      Header.tsx
      EmailResultCard.tsx
      Button.tsx
      CopyButton.tsx
      Loading.tsx
      Input.tsx
    api/
      internal-fetcher.ts # Função centralizada de requisições
    routers/
      emailForm.router.ts # Lógica do formulário
      emailFile.router.ts # Lógica do upload
    types/
      email.types.ts      # Tipos TypeScript
    validations/
      emailFormSchema.ts  # Validação do formulário
      emailFileSchema.ts  # Validação do upload
public/                  # Imagens e ícones
.env.local                # Variáveis de ambiente (API_URL, API_KEY)
```

## Como Executar

1. Instale as dependências:

```bash
npm install
```
ou
```bash
bun install
```

2. Configure o arquivo `.env.local` com sua API_URL e API_KEY.
3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```
ou
```bash
bun dev
```

4. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Configuração de Variáveis de Ambiente

# AVISO: Acesso apenas para rodar local, chaves sem acesso ao projeto principal.

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
API_URL=http://0.0.0.0:8000
API_KEY=2118AEFCFF48F2F4B82D627B75673
```

> **Atenção:**
>
> - Esta chave de API é liberada apenas para análise e testes da vaga.
> - Não utilize em produção ou compartilhe fora do contexto da avaliação.

## Fluxo de Uso

1. Acesse a página inicial.
2. Escolha entre classificar por texto ou arquivo.
3. Preencha o formulário ou faça upload do arquivo.
4. Visualize o resultado, estatísticas NLP e resposta sugerida.
5. Copie a resposta ou volte para nova classificação.
