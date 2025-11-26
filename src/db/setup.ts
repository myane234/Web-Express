import mysql2 from "mysql2/promise";

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "123",
});

const nameDb = "halo";

export async function checkDB() {
    try {
        const conn = await db;

        const [dbCheck] = await conn.query<any[]>(`
            SHOW DATABASES LIKE '${nameDb}'
        `);

        if (dbCheck.length === 0) {
            console.log("Database belum ada → membuat...");
            await conn.query(`CREATE DATABASE \`${nameDb}\``);
        } else {
            console.log("Database sudah ada → skip");
        }
        await conn.changeUser({ database: nameDb });

        const [tableCheck] = await conn.query<any[]>(`
            SHOW TABLES LIKE 'users'
        `);

        if (tableCheck.length === 0) {
            console.log("Table users belum ada → membuat...");
            await conn.query(`
                CREATE TABLE users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nama VARCHAR(150) UNIQUE NOT NULL,
                    password VARCHAR(200) NOT NULL,
                    dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
        } else {
            console.log("Table users sudah ada → skip");
        }

        console.log("Setup DB selesai.");

    } catch (err) {
        console.error(err);
    }
}
