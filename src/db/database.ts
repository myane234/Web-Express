import mysql2 from 'mysql2/promise.js';

export const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'latihan_web'
})

async function testDB() {
    const connection = await db.getConnection();
    console.log('Database connected successfully');
    connection.release();
}

testDB();