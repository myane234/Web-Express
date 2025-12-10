import { Router } from "express";
import { checkEmail, getAllUsers, LoginUser, RegisterUser, getAllUsersByParams } from "../handlers/UsersHandlers.js"
import { resetPassword } from "../handlers/resetPassword.js";


const route = Router();

route.get('/users', getAllUsers);

route.delete('/users/:id', getAllUsersByParams);

route.post('/login', LoginUser)

route.post('/register', RegisterUser)

route.post('/checkEmail', checkEmail)

route.post('/resetPassword', resetPassword)

export default route;