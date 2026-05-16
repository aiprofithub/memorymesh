import { z } from "zod";

export const MemoryScopeSchema = z.enum(["user", "project", "agent", "org"]);
export const MemoryTypeSchema = z.enum(["fact", "preference", "decision", "task", "warning", "insight"]);
export const MemorySourceSchema = z.enum(["chat", "api", "mcp", "webhook", "import"]);

export const CreateMemorySchema = z.object({
  tenantId: z.string().default("default"),
  userId: z.string().min(1),
  projectId: z.string().optional(),
  agentId: z.string().optional(),
  scope: MemoryScopeSchema.default("user"),
  type: MemoryTypeSchema.default("fact"),
  source: MemorySourceSchema.default("api"),
  content: z.string().min(1).max(8000),
  tags: z.array(z.string()).default([]),
  confidence: z.number().min(0).max(1).default(0.8),
  importance: z.number().min(0).max(1).default(0.5),
  expiresAt: z.string().datetime().nullable().default(null),
  metadata: z.record(z.string(), z.unknown()).default({})
});

export type CreateMemoryInput = z.infer<typeof CreateMemorySchema>;

export type MemoryRecord = CreateMemoryInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type SearchMemoryInput = {
  tenantId?: string;
  userId?: string;
  agentId?: string;
  scope?: MemoryRecord["scope"];
  query?: string;
};

export function searchMemories(memories: MemoryRecord[], input: SearchMemoryInput): MemoryRecord[] {
  const query = input.query?.toLowerCase().trim();

  return memories
    .filter((memory) => {
      if (input.tenantId && memory.tenantId !== input.tenantId) return false;
      if (input.userId && memory.userId !== input.userId) return false;
      if (input.agentId && memory.agentId !== input.agentId) return false;
      if (input.scope && memory.scope !== input.scope) return false;
      if (!query) return true;

      const searchable = [
        memory.content,
        memory.type,
        memory.scope,
        memory.source,
        ...memory.tags
      ].join(" ").toLowerCase();

      return searchable.includes(query);
    })
    .sort((a, b) => b.importance - a.importance || b.createdAt.localeCompare(a.createdAt));
}
