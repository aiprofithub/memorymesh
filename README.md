# MemoryMesh

**Make your AI agents remember — safely.**

MemoryMesh is a model-agnostic memory layer for AI agents, copilots, and AI-native apps. It gives agents persistent memory through REST, a TypeScript SDK, and an MCP server — with consent, retention, auditability, and safe forgetting designed from day one.

> Free for experiments. Paid when memory becomes mission-critical.

---

## Why MemoryMesh?

Most AI agents are still stateless interns with expensive taste.

They can answer one prompt, but they forget:

- what the user prefers
- what happened last session
- what decisions were already made
- what another agent already completed
- which context is safe to reuse
- which memory must expire or be deleted

MemoryMesh gives every agent a shared, permissioned memory layer.

```txt
User → App / Agent / Copilot → MemoryMesh → Safe, searchable memory
```

---

## What you can build

### AI SaaS assistants

Remember customer preferences, plan details, previous issues, and feature context across sessions.

### Multi-agent workflows

Let sales, support, research, coding, and ops agents share memory without dumping full chat history into every prompt.

### MCP-powered desktop agents

Connect local tools like Claude Desktop, Cursor-style agents, and internal copilots to a central memory layer.

### Customer support agents

Recall unresolved issues, preferred tone, account notes, and previous troubleshooting steps.

### Founder/operator agents

Keep decision history, playbooks, outreach preferences, project state, and execution context in one place.

---

## Core features

| Capability | Status |
|---|---|
| Store memories | ✅ |
| Search memories | ✅ |
| Delete / forget memories | ✅ |
| TypeScript SDK | ✅ |
| REST API | ✅ |
| MCP server scaffold | ✅ |
| Memory schema | ✅ |
| Local development mode | ✅ |
| Hosted Cloud API | Planned |
| Team workspaces | Planned |
| Audit log | Planned |
| Memory graph | Planned |
| Retention policies | Planned |
| Role-based memory access | Planned |

---

## Quick start

```bash
pnpm install
pnpm dev
```

API runs at:

```txt
http://localhost:4310
```

Health check:

```bash
curl http://localhost:4310/health
```

---

## Store a memory

```bash
curl -X POST http://localhost:4310/v1/memories \
  -H "content-type: application/json" \
  -d '{
    "userId": "user_123",
    "agentId": "agent_sales",
    "type": "preference",
    "content": "User prefers concise execution steps in Thai.",
    "tags": ["preference", "thai", "execution"]
  }'
```

---

## Search memory

```bash
curl "http://localhost:4310/v1/memories/search?userId=user_123&q=thai"
```

---

## Use the SDK

```ts
import { createMemoryMeshClient } from "@memorymesh/sdk";

const memory = createMemoryMeshClient({
  baseUrl: "http://localhost:4310"
});

await memory.remember({
  userId: "user_123",
  agentId: "agent_founder",
  type: "decision",
  content: "User decided to launch MemoryMesh as an open-source repo with a hosted cloud upsell.",
  tags: ["decision", "launch", "pricing"]
});

const context = await memory.search({
  userId: "user_123",
  query: "What launch strategy did the user choose?"
});

console.log(context);
```

---

## Memory object

```ts
type Memory = {
  id: string;
  tenantId?: string;
  userId: string;
  agentId?: string;
  scope: "user" | "project" | "org" | "agent";
  type: "preference" | "fact" | "decision" | "task" | "warning" | "insight";
  content: string;
  tags: string[];
  importance: number;
  source: "chat" | "api" | "mcp" | "webhook" | "manual";
  createdAt: string;
  expiresAt?: string | null;
};
```

---

## Open source vs Cloud

MemoryMesh is open source and self-hostable.

For teams that want hosted memory, API keys, team workspaces, retention controls, MCP cloud sync, and audit logs, MemoryMesh Cloud will be available through AIProfitHub.

| Feature | Open Source | Cloud Free | Builder | Team |
|---|---:|---:|---:|---:|
| Local memory API | ✅ | ✅ | ✅ | ✅ |
| TypeScript SDK | ✅ | ✅ | ✅ | ✅ |
| MCP server | ✅ | ✅ | ✅ | ✅ |
| Hosted memory storage | ❌ | ✅ | ✅ | ✅ |
| Memories included | Local | 1,000 | 10,000 | 100,000 |
| Search requests | Local | 100/day | 2,000/day | 20,000/day |
| Projects | Local | 1 | 3 | 10 |
| Agents | Local | 1 | 3 | 20 |
| Retention | Local | 30 days | 180 days | Custom |
| Team workspace | ❌ | ❌ | ❌ | ✅ |
| Audit log | Basic | ❌ | Basic | Advanced |
| Memory graph | ❌ | ❌ | Preview | ✅ |
| Priority support | ❌ | ❌ | ✅ | ✅ |

---

## Cloud waitlist

Want a hosted endpoint for your agents?

**Join the MemoryMesh Cloud waitlist:**

```txt
https://aiprofithub.ai/memorymesh
```

What you get in Cloud Free:

```txt
1 hosted project
1 API key
1,000 memories
100 searches/day
30-day retention
REST API + SDK + MCP access
```

No credit card planned for the free tier.

---

## The upgrade trigger

Memory gets valuable after an agent starts relying on it.

That is why the free tier is generous enough for experiments, but intentionally limited for production.

```txt
Free = experiments, demos, personal agents
Paid = production agents, teams, auditability, retention, shared memory
```

---

## Roadmap

### Phase 1 — Developer memory layer

- [x] REST API
- [x] TypeScript SDK
- [x] Local memory store
- [x] Basic search
- [x] MCP server scaffold
- [ ] API key auth
- [ ] Memory import/export
- [ ] Hosted waitlist page

### Phase 2 — Production memory

- [ ] Postgres storage
- [ ] Vector search adapter
- [ ] Memory scoring
- [ ] Retention policies
- [ ] Audit events
- [ ] Webhooks
- [ ] Team projects

### Phase 3 — Memory control plane

- [ ] Memory graph
- [ ] Memory receipts
- [ ] Role-based access
- [ ] Sensitive memory detection
- [ ] Agent handoff memory
- [ ] Cloud dashboard
- [ ] Enterprise controls

---

## Design principles

### Memory should be explicit

Agents should not silently remember everything.

### Memory should be inspectable

Users and teams should see what was stored and why.

### Memory should be forgettable

Deletion, expiry, and export are core product features, not compliance afterthoughts.

### Memory should be portable

Your memory layer should not be locked to one model provider.

---

## Good first issues

- Add API key authentication
- Add SQLite persistence
- Add Postgres adapter
- Add vector search adapter
- Add MCP memory search tool
- Add memory import/export CLI
- Add retention policy tests
- Add hosted Cloud waitlist landing page

---

## License

MIT
