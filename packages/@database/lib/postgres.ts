import { Pool, type QueryResult, type QueryResultRow } from 'pg';

function getPool() {
  const config = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10)
  };

  return new Pool(config);
}

async function runQuery<Item extends QueryResultRow>(
  pool: Pool,
  query: string,
  params: any[]
) {
  const client = await pool.connect();

  let data: QueryResult<Item> | null = null;
  let error: Error | null = null;

  try {
    data = await client.query(query, params);
  } catch (e) {
    error = e instanceof Error ? e : new Error('GenericPostgresInsertError');
  } finally {
    client.release();

    if (error) {
      throw error;
    }

    if (data) {
      return data;
    }
  }
}

export { getPool, runQuery }