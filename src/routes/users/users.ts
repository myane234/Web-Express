import { Router } from "express";
import { deleteUsers, getUsers, getUsersByQuery } from "../../handlers/users.js";

const router = Router();

router.get('/users', getUsers);

router.get('/pengguna', getUsersByQuery)

router.delete('/users/:id', deleteUsers)

export default router; // nge export router supaya bisa dipake di file lain