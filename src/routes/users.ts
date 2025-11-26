import {Router}  from "express";
import { getUsersHandler, getUsersByidHandler } from "../handlers/usersHandlers.js";

const route = Router(); 

route.get('/users', getUsersHandler);

route.get('/users/:id', getUsersByidHandler);

export default route;