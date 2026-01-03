import { Router } from "express";
import type { Request, Response } from 'express';
import { allUser, login, Me, register } from "../Handlers/usershandlers.js";

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
 * @openapi
 * /user/register:
 *   post:
 *     summary: register new User
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama
 *               - password
 *             properties:
 *               nama:
 *                 type: string
 *                 example: faruq
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123"
 *     responses:
 *       200:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *       400:
 *         description: Bad request
 */
route.post('/register', register)


/**
 * @openapi
 * /user/allUsers:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - user
 *     responses:
 *       200:
 *         description: User ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sukses:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nama:
 *                         type: string
 *                         example: "Faruq"
 *                       password:
 *                         type: password
 *                         example: 1234
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sukses:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Terjadi kesalahan"
 */
route.get('/allUsers', allUser)

/**
 * @openapi
 * /user/login:
 *   post:
 *     summary: login User
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama
 *               - password
 *             properties:
 *               nama:
 *                 type: string
 *                 example: faruq
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User Login succes"
 *       400:
 *         description: Bad request
 *       401:
 *         description: wrong password or nama
 */
route.post('/login', login)


export default route;