import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const lokasi = path.join(__dirname, 'public');

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(lokasi));
const PORT = process.env.PORT || 90;

app.get('/', (req, res) => {
    res.sendFile(path.join(lokasi , 'menu.html'));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(lokasi , 'login.html'))
})

app.post('/login', async (req, res) => {
    try {
        const { nama, password } = req.body; // nama nama pw input users

        const [users] = await pool.query("SELECT * FROM users WHERE nama = ?", [nama]);

        if(users.length === 0) {
            return res.status(401).json({
                message: 'users Gak di temukan'
            })
        }

        const user = users[0];

        const validPw = await bcrypt.compare(password, user.password) // pw input users 
        // dan user.password

        if(!validPw) {
            return res.status(401).json({
                succes: false,
                message: 'pw tidak cocok'
            })
        }

        return res.json({
            succes: true,
            message: 'berhasil login'
        })
    } catch(err) {
        console.error(err);
    }
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(lokasi, 'register.html'))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})