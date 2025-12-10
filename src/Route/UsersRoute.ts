import { Router } from "express";
import { checkEmail, getAllUsers, LoginUser, RegisterUser } from "../handlers/UsersHandlers.js"


const route = Router();

route.get('/users', getAllUsers);

route.post('/login', LoginUser)

route.post('/register', RegisterUser)

route.post('/checkEmail', checkEmail)

export default route;