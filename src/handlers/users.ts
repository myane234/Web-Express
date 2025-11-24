import type { Request, Response } from "express";

export function getUsers(req: Request, res: Response) {
    res.json([{ id: 1, name: "John Doe" }, { id: 2, name: "Jane Smith" }]);
}