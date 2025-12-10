import cyrpto from 'crypto';
import type{ Request, Response } from 'express';
import bcrypt from 'bcrypt';


// /module
import { db } from '../database/db.js';


export async function createResetToken(userId: number, hoursValid: 1) {
    const token = cyrpto.randomBytes(32).toString('hex');
    const exipiredAt = new Date(Date.now() + hoursValid * 60 * 60 * 1000);

    await db.query(`INSERT INTO resetpass (user_id, token, expired_at) VALUES (?, ?, ?)`, 
    [userId, token, exipiredAt]);

    return token;
} 


async function getValidResetToken(token: string) {
    const [rows]: any = await db.query(`SELECT pr.*, u.email, u.id as user_id FROM resetpass pr
    JOIN users u ON pr.user_id = u.id
    WHERE pr.token = ? AND pr.used = 0 AND pr.expired_at > NOW()`, [token]);

    return rows[0] ?? null; 
}

async function markTokenAsUsed(tokenId: number) {
    await db.query(`UPDATE resetpass SET used = 1 WHERE id = ?`, [tokenId]);
}


export async function resetPassword(req: Request, res: Response) {
    const { token, newPassword } = req.body;

    try {
        const data = await getValidResetToken(token);

        if(!data) {
            return res.status(400).json({message: 'Invalid or expired token', sukses: false});
        }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(`UPDATE users SET password = ? WHERE id = ?`, [hashedPassword, data.user_id]);


    await markTokenAsUsed(data.id);

    return res.status(200).json({message: 'Password has been reset successfully', sukses: true});
    } catch(err) {
        console.error(err);
        return res.status(500).json({message: 'Internal Server Error', sukses: false});
    }
}