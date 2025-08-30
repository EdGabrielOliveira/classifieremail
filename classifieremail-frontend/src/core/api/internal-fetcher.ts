const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

export async function internalFetcher(url: string, options?: RequestInit): Promise<Response> {
  const normalizedUrl = url.replace(/^\/+/, "");
  const finalUrl = `${API_URL}/${normalizedUrl}`;

  const headers: Record<string, string> = {
    "X-Api-Key": `${API_KEY}`,
    ...(options?.headers && !(options.headers instanceof Headers) && !Array.isArray(options.headers)
      ? (options.headers as Record<string, string>)
      : {}),
  };

  if (!(options?.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  } else {
    delete headers["Content-Type"];
  }

  try {
    const response = await fetch(finalUrl, {
      ...options,
      body: options?.body instanceof FormData ? options.body : JSON.stringify(options?.body),
      headers,
    });

    return response;
  } catch (error) {
    console.error("Erro na requisição interna:", error);
    throw error;
  }
}
