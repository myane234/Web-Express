import type { Request, Response } from "express";
import { db } from '../config/db.js'
import bcrypt from 'bcrypt';

export async function getUsers(req: Request, res: Response) {
    try {
        const [hasil]: any = await db.query("SELECT * FROM users")

        if(hasil.length === 0) {
            return res.status(200).json({
                message: 'Tidak ada data',
                data: [],
                sukses: false
            })
        }

        return res.status(200).json({
            message: 'Users ketemu',
            data: hasil,
            sukses: true
        })

    } catch(err) {
        console.error(err);

        return res.status(500).json({
            message: 'Server Bermasalah',
            sukses: false
        })
    }
}

export async function getUsersByQuery(req: Request, res: Response) {
    const { id } = req.query;

    try {
        const [checkUsers]: any = await db.query("SELECT * FROM users WHERE id = ?", [id])

        if(checkUsers.length === 0) {
            return res.status(200).json({
                message: `Users dengan id: ${id} Tidak ada`,
                data: [],
                sukses: false
            })
        }

        return res.status(200).json({
            message: `Users dengan id: ${id} Di temuka`,
            data: checkUsers,
            sukses: true
        })

    } catch(err) {
        console.error(err)
        return res.status(500).json({
            message: 'Server Bermasalah',
            sukse: false
        })
    }
}

export async function login(req: Request, res: Response) {
    const { nama, password } = req.body

    try {

        const [checkPw] = await db.query('SELECT * FROM users WHERE nama = ?', [nama]) as any[];

        if(checkPw.length === 0) {
            return res.status(400).json({
                message: 'gak ada users yang di temukan',
                sukses: false
            })
        }

        const user = checkPw[0];


        const banding = await bcrypt.compare(password,user.password )

        if(banding) {
         return res.status(200).json({
            message: 'Login Berhasil',
            sukses: true
        })
        } else {
            return res.status(400).json({
                message: 'Password Salah',
                sukses: false
            })
        }

       
    } catch(err) {
        console.error(err)
        return res.status(500).json({
            message: 'Server Bermasalah',
            sukses: false
        })
    }
}

export async function register(req: Request, res: Response) {
    const { nama, password } = req.body;
    const salt = 10;

    try {
        const [checkusers] = await db.query("INSER INTO users WHERE nama = ?", [nama]) as any[]

        if(checkusers.length > 0) {
            return res.status(400).json({
                message: 'username udah di pake',
                sukses: 'false'
            })
        }

        const hashpw = await bcrypt.hash(password, salt)

        await db.query("INSERT INTO users (nama, password) VALUES (?, ?)", [nama, hashpw])

        return res.status(200).json({
            message: 'Berhasil Nambahin User',
            sukses: true
        })
    } catch(err) {
        console.error(err)
        return res.status(500).json({
            message: 'Server error',
            sukses: false
        })
    }
}