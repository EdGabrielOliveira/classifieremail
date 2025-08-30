import { NextRequest, NextResponse } from "next/server";
import { internalFetcher } from "../../../../core/api/internal-fetcher";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Arquivo é obrigatório" }, { status: 400 });
    }

    const isValidTxt = file.type === "text/plain" || file.name.endsWith(".txt");
    if (!isValidTxt) {
      return NextResponse.json({ error: "Apenas arquivos TXT são permitidos" }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "Arquivo muito grande. Limite: 5MB" }, { status: 400 });
    }

    const externalFormData = new FormData();
    externalFormData.append("file", file);

    const response = await internalFetcher("classemailtxt", {
      method: "POST",
      body: externalFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro da API externa:", errorText);
      return NextResponse.json({ error: "Erro na classificação do TXT" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro no endpoint de TXT:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
