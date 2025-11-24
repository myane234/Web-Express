import { Router } from "express";
import { getUsers } from "../handlers/users.js";

const router = Router();

router.get('/', getUsers);

export default router; // nge export router supaya bisa dipake di file lain