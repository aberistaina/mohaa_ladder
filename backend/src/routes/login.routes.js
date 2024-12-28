import { Router } from "express";
import { emitirToken } from "../middlewares/login.middleware.js";
import { login, loginGoogle } from "../controllers/login.controller.js";




const router = Router()

router.post("/",emitirToken, login )
router.post("/google", loginGoogle )




export default router