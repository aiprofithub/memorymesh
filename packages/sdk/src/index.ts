export type MemoryMeshClientOptions = {
  apiKey?: string;
  baseUrl?: string;
};

export type RememberInput = {
  tenantId?: string;
  userId: string;
  projectId?: string;
  agentId?: string;
  scope?: "user" | "project" | "agent" | "org";
  type?: "fact" | "preference" | "decision" | "task" | "warning" | "insight";
  source?: "chat" | "api" | "mcp" | "webhook" | "import";
  content: string;
  tags?: string[];
  confidence?: number;
  importance?: number;
  expiresAt?: string | null;
  metadata?: Record<string, unknown>;
};

export type SearchInput = {
  tenantId?: string;
  userId?: string;
  agentId?: string;
  scope?: "user" | "project" | "agent" | "org";
  query?: string;
};

export function createMemoryMeshClient(options: MemoryMeshClientOptions = {}) {
  const baseUrl = options.baseUrl ?? "http://localhost:4310";

  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers: {
        "content-type": "application/json",
        ...(options.apiKey ? { authorization: `Bearer ${options.apiKey}` } : {}),
        ...init?.headers
      }
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new Error(`MemoryMesh request failed: ${response.status} ${body}`);
    }

    return response.json() as Promise<T>;
  }

  return {
    remember(input: RememberInput) {
      return request("/v1/memories", {
        method: "POST",
        body: JSON.stringify(input)
      });
    },

    search(input: SearchInput) {
      const params = new URLSearchParams();
      if (input.tenantId) params.set("tenantId", input.tenantId);
      if (input.userId) params.set("userId", input.userId);
      if (input.agentId) params.set("agentId", input.agentId);
      if (input.scope) params.set("scope", input.scope);
      if (input.query) params.set("q", input.query);

      return request(`/v1/memories/search?${params.toString()}`);
    },

    forget(id: string) {
      return request(`/v1/memories/${id}`, { method: "DELETE" });
    }
  };
}
