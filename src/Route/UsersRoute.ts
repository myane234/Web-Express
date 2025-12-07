import { Router } from "express";
import { checkTelepon, getAllUsers, LoginUser, RegisterUser } from "../handlers/UsersHandlers.js"


const route = Router();

route.get('/users', getAllUsers);

route.post('/login', LoginUser)

route.post('/register', RegisterUser)

route.post('/checkTelepon', checkTelepon)

export default route;