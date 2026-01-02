import { Router } from "express";
import type { Request, Response } from 'express';
import { Me, register } from "../Handlers/usershandlers.js";

const route = Router();
/**
 * @openapi
 * /user/me:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve user information by user ID
 *     parameters:
 *       - in: query
 *         name: id_user
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sukses:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_user:
 *                       type: integer
 *                     nama:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: ID is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

route.get('/me', Me)

/**
 * 
 */
route.post('/register', register)


export default route;