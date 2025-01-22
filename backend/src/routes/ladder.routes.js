import { Router } from "express";
import { calcularNuevoRanking } from "../controllers/ladder.controller.js";
import { verificarToken } from "../middlewares/login.middleware.js";




const router = Router()

router.post("/", verificarToken, calcularNuevoRanking)




export default router