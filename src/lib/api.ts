import type { RequestInit } from "next/dist/server/web/spec-extension/request";

const BASE_URL = "https://hp-api.onrender.com/api/";

type ApiProps = {
  endpoint: string;
};

export async function api<TResponse>({
  endpoint,
}: ApiProps): Promise<TResponse> {
  const configs: RequestInit = {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  };

  const url: string = `${BASE_URL}${endpoint || ""}`;

  return fetch(url, configs).then((res) => res.json());
}
