import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from '../../../migrations/schema';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

dotenv.config({ path: '.env' });
console.log('🔍 Loaded DB URL:', process.env.DATABASE_URL);


if (!process.env.DATABASE_URL) {
    console.log('🔴 Cannot find database url');
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(client, { schema });
const migrateDb = async () => {
    try {
        console.log('🔵 Migrating client');
        await migrate(db, { migrationsFolder: 'migrations' });
        console.log('🟢 Client migrated successfully');
    } catch (error) {
        console.log('🔴 Error migrating client', error);
    }
};
migrateDb().catch((err) => console.error("Migration error:", err));

export default db;
