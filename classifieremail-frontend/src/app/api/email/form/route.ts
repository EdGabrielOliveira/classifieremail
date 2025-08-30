import { NextRequest, NextResponse } from "next/server";
import { internalFetcher } from "../../../../core/api/internal-fetcher";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.remetente || !body.assunto || !body.descricao) {
      return NextResponse.json({ error: "Campos obrigatórios: remetente, assunto, descricao" }, { status: 400 });
    }

    const response = await internalFetcher("classemail", {
      method: "POST",
      body: body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro da API externa:", errorText);
      return NextResponse.json({ error: "Erro na classificação do email" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro no endpoint de formulário:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
