import express from 'express';
import type{ Request, Response } from 'express';
import usersRoutes from './routes/users/users.js';

import path from 'path';
import { fileURLToPath } from 'url';
import { login, register } from './handlers/users.js';
import { db ,setupDb } from './config/setup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

//Middleware to serve static files
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'menu.html'));
})

app.get('/register', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'register.html'))
})

app.post('/register', register)

app.get('/dashboard', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'dashboard.html'))
})

// login
 app.get('/login', (req: Request, res: Response ) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'login.html'))
    })

app.post('/login', login)

app.use('/api', usersRoutes);


async function start () {

    await setupDb();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

}

start();