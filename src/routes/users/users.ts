import { Router } from "express";
import { getUsers, getUsersByQuery } from "../../handlers/users.js";

const router = Router();

router.get('/users', getUsers);

router.get('/pengguna', getUsersByQuery)

export default router; // nge export router supaya bisa dipake di file lain