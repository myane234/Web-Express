import mysql2 from 'mysql2/promise';
import test from 'node:test';

export const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'ts_crud',
    port: 3307,
})

async function testConn(){
    const conn = await db.getConnection();
    console.log(`Database Connected: ${conn.connection.threadId}`);
    conn.release();
}

testConn();

