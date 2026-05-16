import Fastify from "fastify";
import { nanoid } from "nanoid";
import { CreateMemorySchema, searchMemories, type MemoryRecord } from "@memorymesh/memory-core";

const app = Fastify({ logger: true });
const memories: MemoryRecord[] = [];

app.get("/health", async () => ({
  ok: true,
  service: "memorymesh-api",
  version: "0.1.0"
}));

app.post("/v1/memories", async (request, reply) => {
  const parsed = CreateMemorySchema.safeParse(request.body);

  if (!parsed.success) {
    return reply.status(400).send({
      error: "INVALID_MEMORY_PAYLOAD",
      issues: parsed.error.flatten()
    });
  }

  const now = new Date().toISOString();
  const memory: MemoryRecord = {
    id: `mem_${nanoid(12)}`,
    createdAt: now,
    updatedAt: now,
    ...parsed.data
  };

  memories.push(memory);
  return reply.status(201).send({ memory });
});

app.get("/v1/memories/search", async (request) => {
  const query = request.query as {
    tenantId?: string;
    userId?: string;
    agentId?: string;
    scope?: MemoryRecord["scope"];
    q?: string;
  };

  return {
    results: searchMemories(memories, {
      tenantId: query.tenantId,
      userId: query.userId,
      agentId: query.agentId,
      scope: query.scope,
      query: query.q
    })
  };
});

app.delete("/v1/memories/:id", async (request, reply) => {
  const params = request.params as { id: string };
  const index = memories.findIndex((memory) => memory.id === params.id);

  if (index === -1) {
    return reply.status(404).send({ error: "MEMORY_NOT_FOUND" });
  }

  const [deleted] = memories.splice(index, 1);
  return { ok: true, deleted };
});

const port = Number(process.env.PORT ?? 4310);

app.listen({ port, host: "0.0.0.0" }).catch((error) => {
  app.log.error(error);
  process.exit(1);
});
