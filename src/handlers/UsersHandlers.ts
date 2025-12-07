import type{ Request, Response } from 'express';
import bcrypt, { compare } from 'bcrypt'
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
    const {nama, password, telepon} = req.body;
    try {
        const [checkUsers]: any = await db.query(`SELECT * FROM users WHERE nama = ?`, [nama]);
        const [checkTelepon]:any = await db.query(`SELECT * FROM users WHERE telepon = ?`, [telepon])

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

        const hashPw = await bcrypt.hash(password, 10);

        await db.query('INSERT INTO users (nama, password, telepon) VALUES (?, ?, ?)', [nama, hashPw, telepon]);
        return res.status(200).json({
            message: 'Register Sukses', sukses: true
        })

    } catch(err) {
        console.error(err);
        return res.status(500).json({message: 'Internal Server Error', sukses: false});
    }
}

export async function checkTelepon(req: Request, res: Response) {
    const { telepon } = req.body;
    try {
        const [checkTelepon]:any = await db.query(`SELECT * FROM users WHERE telepon = ?`, [telepon]);

        if(checkTelepon.length === 0) {
            return res.status(404).json({
                message: 'Tidak ada Akun dengan Nomer ini', sukses: false
            })
        }

        return res.status(200).json({
            message: 'Akun Ditemukan', sukses: true
        })
    } catch(err) {
        console.error(err);
        return res.status(500).json({message: 'Internal Server Error', sukses: false});
    }
}