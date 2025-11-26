import { Router } from "express";
import {Regist} from "../handlers/registerHandlers.js"

const route = Router();

route.post('/register', Regist)

export default route