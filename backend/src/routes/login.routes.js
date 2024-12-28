import { Router } from "express";
import { emitirToken } from "../middlewares/login.middleware.js";
import { login } from "../controllers/login.controller.js";




const router = Router()

router.post("/",emitirToken, login )




export default router