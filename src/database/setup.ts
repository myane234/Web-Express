import mysql from 'mysql2/promise'
import 'dotenv/config'

const usersTable = `CREATE TABLE IF NOT EXISTS users(
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(155) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

const postinganTable = `CREATE TABLE IF NOT EXISTS postingan (
id_Post INT PRIMARY KEY AUTO_INCREMENT,
id_user INT NOT NULL,
title VARCHAR(255) NOT NULL,
done BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(id_user) REFERENCES users(id_user) ON DELETE CASCADE
)`

const database = process.env.DATABASE

const db = mysql.createPool({
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || '1234',
})

console.log(database)

export async function setupDb() {
    
    await db.query(`CREATE DATABASE IF NOT EXISTS ${database}`) // create database
    await db.query(`USE ${database}`)

    await db.query(usersTable) //create table users
    await db.query(postinganTable) //create table postingan

    console.log(`ALL DATABASE AMAN`)
}