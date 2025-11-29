import mysql2 from 'mysql2/promise';

export const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'latihan_rest',
})

db.getConnection()
.then(() => {
    console.log('Database connected');
})