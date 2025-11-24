import express from 'express';
import usersRoutes from './routes/users.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

//Middleware to serve static files
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.use('/api/users', usersRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
