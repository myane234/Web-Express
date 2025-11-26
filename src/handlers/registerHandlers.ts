import type { Request , Response } from "express";
import { db } from "../db/database.js"
import bcrypt from 'bcrypt'

export async function Regist(req: Request, res: Response) {
    const { nama, password } = req.body;

    const hasil = await db.query("SELECT * FROM users WHERE nama = ?", [nama]);

    if(hasil.length > 0) {
        return res.status(400).json({
            message: "Sudah ada User"
        })
    }

    const salt = 10;
    const hashPw = await bcrypt.hash(password, salt);

    await db.query("INSERT INTO users (nama, password) VALUES (?, ?)", [nama, hashPw]);

    return res.json({ok: true, message: "Berhasil Register"});
    
}