import type{ Request, Response } from 'express';
import bcrypt, { compare } from 'bcrypt'
import cyrpto from 'crypto';

//MODULE
import { sendResetPassword } from '../mailTamp/resetPw.js';
import {db} from '../database/db.js'


export async function getAllUsers(req: Request, res: Response) {
    try {
       const [users]:any = await db.query('SELECT * FROM users')

       if(users.length === 0) {
        return res.status(404).json({message: 'Gak Nemu users', sukses: false});
       }
       res.status(200).json({data: users, sukses: true});
        
    } catch(err) {
        res.status(500).json({message: 'Internal Server Error', sukses: false});
    }
}

export async function LoginUser(req: Request, res: Response) {
    const {nama, password} = req.body;
    try {
        const [userPW]: any = await db.query('SELECT * FROM users WHERE nama = ?', [nama]);

        if(userPW.length === 0) {
            return res.status(404).json({message: 'Gak nemu Users', sukses: false});
        }

        const validPw = await compare(password, userPW[0].password);

        if(!validPw) {
            return res.status(400).json({message: 'Password salah', sukses: false});
        }

        return res.status(200).json({
            message: 'Login Sukses', sukses: true
        })
    } catch(err) {
        return res.status(500).json({message: 'Internal Server Error', sukses: false});
    }
}

export async function RegisterUser (req: Request, res: Response) {
    const {nama, password, telepon, email} = req.body;
    try {
        const [checkUsers]: any = await db.query(`SELECT * FROM users WHERE nama = ?`, [nama]);
        const [checkTelepon]:any = await db.query(`SELECT * FROM users WHERE telepon = ?`, [telepon])
        const [checkEmail]: any = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);

        console.log(nama, password, email, telepon)

        if(checkUsers.length > 0) {
            return res.status(400).json({
                message: 'Sudah ada user lain', sukses: false
            })
        }

        if(checkTelepon.length > 0) {
            return res.status(400).json({
                message: 'Nomor telepon sudah terdaftar', sukses: false
            })
        }

        if(checkEmail.length > 0) {
            return res.status(400).json({
                message: 'udah Ada email lain', sukses: false
            })
        }

        const hashPw = await bcrypt.hash(password, 10);

        await db.query('INSERT INTO users (nama, password, telepon, email) VALUES (?, ?, ?, ?)', [nama, hashPw, telepon, email]);
        return res.status(200).json({
            message: 'Register Sukses', sukses: true
        })

    } catch(err) {
        console.error(err);
        return res.status(500).json({message: 'Internal Server Error', sukses: false});
    }
}

// export async function checkTelepon(req: Request, res: Response) {
//     const { telepon } = req.body;
//     try {
//         const [checkTelepon]:any = await db.query(`SELECT * FROM users WHERE telepon = ?`, [telepon]);

//         if(checkTelepon.length === 0) {
//             return res.status(404).json({
//                 message: 'Tidak ada Akun dengan Nomer ini', sukses: false
//             })
//         }

//         return res.status(200).json({
//             message: 'Akun Ditemukan', sukses: true
//         })
//     } catch(err) {
//         console.error(err);
//         return res.status(500).json({message: 'Internal Server Error', sukses: false});
//     }
// }

async function createResetToken(userId: number, hoursValid: 1) {
    const token = cyrpto.randomBytes(32).toString('hex');
    const exipiredAt = new Date(Date.now() + hoursValid * 60 * 60 * 1000);

    await db.query(`INSERT INTO resetpass (user_id, token, expired_at) VALUES (?, ?, ?)`, 
    [userId, token, exipiredAt]);

    return token;
} 


async function getValidResetToken(token: string) {
    const [rows]: any = await db.query(`SELECT pr.*, u.email, u.id as user_id FROM passwod_resets pr
    JOIN users u ON pr.user_id = u.id
    WHERE pr.token = ? AND pr.used = 0 AND pr.expired_at > NOW()`, [token]);

    return rows[0] ?? null; 
}

async function markTokenAsUsed(tokenId: number) {
    await db.query(`UPDATE resetpass SET used = 1 WHERE id = ?`, [tokenId]);
}

export async function checkEmail(req: Request, res: Response) {
    const { email } = req.body;

    try {
        const [checkEmail]:any = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);

        if(checkEmail.length === 0) {
            return res.status(404).json({
                message: 'Tidak ada Akun dengan Email ini', sukses: false
            })
        }

        const user = checkEmail[0];
        const token = await createResetToken(user.id, 1); // Token berlaku 1 jam
        const emailSent = await sendResetPassword(user.email, token);

        if(!emailSent) {
            return res.status(500).json({
                message: 'Gagal mengirim email reset password',
                 sukses: false});
        }

        return res.status(200).json({
            message: 'Akun Ditemukan, email sudah dikirim', sukses: true, isi: user.nama
        })
    } catch(err) {
        console.error(err);
        return res.status(500).json({message: 'Internal Server Error', sukses: false});
    }
}