import express from 'express';
import type { Request, Response } from 'express';

//import util
import { setupDb } from './database/setup.js';
import usersRoute from './Route/UsersRoute.js';
import AIRoute from './Route/AIRoutes.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const app = express();
const port = 3000;

app.use(express.json());



app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

app.get('/login', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
})

app.get('/register', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'register.html'));
})

app.get('/menu', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'menu.html'));
})

app.get('/updatepwC', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'updatePWC.html'));
})

app.use('/api',usersRoute);

app.use('/ai', AIRoute);


app.use(express.static(path.join(__dirname, '..', 'public')));

async function startServer() {
    await setupDb();
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    })
}

startServer();