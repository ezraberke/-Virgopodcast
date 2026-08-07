import { Pool } from "@neondatabase/serverless";

let pool: Pool | undefined;

export function getPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not configured");
  pool ??= new Pool({ connectionString });
  return pool;
}
