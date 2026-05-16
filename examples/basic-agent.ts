import { createMemoryMeshClient } from "@memorymesh/sdk";

const memory = createMemoryMeshClient({
  baseUrl: process.env.MEMORYMESH_BASE_URL ?? "http://localhost:4310",
  apiKey: process.env.MEMORYMESH_API_KEY
});

async function main() {
  await memory.remember({
    userId: "user_123",
    agentId: "agent_sales",
    scope: "user",
    type: "preference",
    content: "User prefers concise Thai execution steps.",
    tags: ["thai", "preference", "execution"],
    importance: 0.9
  });

  const relevantMemory = await memory.search({
    userId: "user_123",
    query: "response preference"
  });

  console.log(relevantMemory);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
