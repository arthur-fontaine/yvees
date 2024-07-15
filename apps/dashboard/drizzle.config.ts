import { createRequire } from 'node:module';

import { defineConfig } from 'drizzle-kit';

const schemaPath = typeof require === 'function' ?
    require.resolve('db/schema')
    : createRequire(import.meta.url).resolve('db/schema');

export default defineConfig({
  schema: schemaPath,
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:./sqlite.db',
  },
});
