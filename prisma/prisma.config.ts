import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    db: {
      url: process.env.DATABASE_URL!, // استخدام المتغير البيئي مباشرة
    },
  },
});
