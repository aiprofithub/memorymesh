# Security notes

AI memory is sensitive infrastructure. The system must avoid storing secrets, credentials, payment data, private health data, or unnecessary personal data by default.

## Principles

- Store only useful memory
- Prefer explicit consent for durable memory
- Support deletion and export
- Keep audit receipts for memory creation and access
- Redact secrets before storage
- Use tenant isolation from the first production version
- Treat MCP tools as privileged interfaces

## Memory firewall roadmap

- Allowlist memory types
- Denylist secrets and sensitive patterns
- Expiry by type and scope
- Role-based read/write policies
- Source confidence scoring
- Human review for organization-wide memories
