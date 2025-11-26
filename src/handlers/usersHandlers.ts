import type { Request, Response } from "express";
import { db } from "../db/database.js";


export async function getUsersHandler(req: Request, res: Response) {
   const [users] = await db.query("SELECT * FROM users");
    res.json(users);
}

export async function getUsersByidHandler(req: Request, res: Response) {
    const { id } = req.params;
    const [users] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    res.json(users);
}