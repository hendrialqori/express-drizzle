import { migrate } from 'drizzle-orm/mysql2/migrator';
import { db, poolConnection as connection } from './db';

async function main() {

    // This will run migrations on the database, skipping the ones already applied
    await migrate(db, { migrationsFolder: './src/drizzle/migrations' });
    // Don't forget to close the connection, otherwise the script will hang
    await connection.end();
}

main()
