import mysql from 'mysql2/promise'

export const db = mysql.createPool({
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || '1234',
    database: process.env.DATABASE || 'Api_Web'
})