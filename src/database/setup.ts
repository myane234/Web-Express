import mysql2 from 'mysql2/promise';

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password:'123',
    port: 3307,
})

export async function setupDb() {
    try {
        await pool.query(`CREATE DATABASE IF NOT EXISTS ts_crud`);
        console.log('Database ts_crud ensured to exist.');

        await pool.query(`USE ts_crud`);


        await pool.query(`CREATE TABLE IF NOT EXISTS users(
            id INT AUTO_INCREMENT PRIMARY KEY,
            nama VARCHAR(150) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            telepon VARCHAR(30) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`)
            console.log(`Table Users Sudah di buat`);

       const [users]:any =  await pool.query(`SELECT * FROM users`);

       if(users.length === 0){
            await pool.query(`INSERT INTO users (nama, password, telepon, email) VALUES ('admin',
                 '$2b$10$pfIw6PlQ1sN60J00P.x45.eeGw3FFlj7SJjBkv5eieD.1ObPlkjOW', '085721829539', 'flytothemoonkawaii@gmail.com')`)
            // pw nya, pw legend 123
       }

       console.log(`Data Users aman`)

    } catch(err) {
        console.error('Error setting up database:', err);
    }
}