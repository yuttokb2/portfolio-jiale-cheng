#!/usr/bin/env bash
# MCP Supabase wrapper — portfolio (read-only by default).
# Secrets resolved via Infisical at runtime; no tokens stored on disk.
# ponytail: quita --read-only para permitir DDL/writes (migraciones).
exec infisical run --env=dev --silent -- bash -c '
exec npx -y @supabase/mcp-server-supabase@latest \
  --read-only \
  --project-ref "qkseugvekxwrslmmkalk" \
  --access-token "$SUPABASE_ACCESS_TOKEN"
'
