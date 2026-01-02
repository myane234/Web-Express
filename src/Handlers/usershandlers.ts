import type{ Request, Response } from "express";
import bcrypt from 'bcrypt'
import { db } from "../database/db.js";

export async function register(req: Request, res: Response) {
    const { nama, password } = req.body;
    try {
        const [checkUsers]:any[] = await db.query(`SELECT nama, password FROM users LIMIT 5`)

        if(checkUsers.length > 0) {
            return res.status(409).json({
                message: 'Sudah ada User lain',
                sukses: false
            })
        }

        if(!nama && !password) {
            return res.status(400).json({
                message: 'Nama atau Password Harus di isi',
                sukses: false
            })
        }

        const hashPw = await bcrypt.hash(password, 10)
        await db.query(`INSERT INTO users(nama, password) VALUES(?, ?)`, [nama,hashPw])

        return res.status(200).json({
            message: 'Berhasil register',
            sukses: true
        })
    } catch(err) {
        return res.status(500).json({
            sukses: false,
            message: 'Server Error'
        })
    }
}

export async function Me(req: Request, res: Response) {
    const {id_user} = req.query
    try {
        if(!id_user) {
            return res.status(400).json({
                message: 'Di butuhkan Query id',
                sukses: false
            })
        }

        const [user]:any[] = await db.query(`SELECT id_user,
             nama, password,
             created_at FROM users WHERE id_user = ?`,[id_user])
        
         if (user.length === 0) {
            return res.status(404).json({
                message: 'User tidak ditemukan',
                sukses: false
            });
        }
        
        return res.status(200).json({
            message: 'User ketemu',
            data: user[0],
            sukses: true
        })
    } catch(err) {
        return res.status(500).json({
            message: 'Server Error',
            sukses: false
        })
    }
}