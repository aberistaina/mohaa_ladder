import { Router } from "express";
import { calcularNuevoRanking } from "../controllers/ladder.controller.js";




const router = Router()

router.post("/", calcularNuevoRanking)




export default router