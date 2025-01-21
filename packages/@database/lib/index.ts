import { getPool as pg_getPool, runQuery as pg_runQuery } from "./postgres";

type PgInfo = {
  user: string;
  database: string;
  host: string;
  port: number;
};

type Postgres = {
  getPool: typeof pg_getPool;
  runQuery: typeof pg_runQuery;
  getInfo(): PgInfo;
  envOk(): boolean;
};

const postgres: Postgres = {
  getPool: pg_getPool,
  runQuery: pg_runQuery,
  getInfo() {
    return {
      user: process.env.POSTGRES_USER!,
      database: process.env.POSTGRES_DB!,
      host: process.env.POSTGRES_HOST!,
      port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
    };
  },
  envOk() {
    return Boolean(
      process.env.POSTGRES_USER &&
      process.env.POSTGRES_DB &&
      process.env.POSTGRES_HOST &&
      process.env.POSTGRES_PASSWORD
    );
  },
};

export { postgres };
