import express, { Request, Response } from 'express';
import usersRoute from './routes/users.js';
import { checkDB } from './db/setup.js';

const app = express();

app.use(express.static("public"))

const PORT = 80;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/api', usersRoute);


async function start(){

    await checkDB();
app.listen(PORT, () => {

    console.log(`Server jalan di http://localhost:${PORT}`);
})
}

start();