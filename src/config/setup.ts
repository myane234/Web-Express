import mysql2 from 'mysql2/promise'

export const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: ''
})

 export async function setupDb() {
    try {
        await db.query("CREATE DATABASE IF NOT EXISTS latihan_rest")
        console.log("DB Aman")

        await db.query("USE latihan_rest");

        await db.query(`CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nama VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(150) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB
            `);
            console.log('TABLE users aman')

        await db.query(`CREATE TABLE IF NOT EXISTS keuangan (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nama_barang VARCHAR(255) NOT NULL,
            harga_satuan INT NOT NULL,
            tanggal DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            qty INT NOT NULL,
            total_harga INT AS (harga_satuan * qty) STORED,
            catetan TEXT
        ) ENGINE=InnoDB `)
         console.log('TABLE keuangan aman')
    } catch(err) {
        console.error(err)
    }
}


