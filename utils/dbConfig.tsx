// Make sure to install the 'pg' package
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

// You can specify any property from the node-postgres connection options
const db = drizzle({
  connection: {
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
    ssl: true,
  },
  schema,
});

const result = await db.execute('select 1');
console.log(result);
