import { Router } from "express";
import { calcularNuevoRanking, obtenerPartidosJugadosPorClan } from "../controllers/ladder.controller.js";
import { verificarToken } from "../middlewares/login.middleware.js";




const router = Router()

router.post("/", verificarToken, calcularNuevoRanking)
router.get("/:id", obtenerPartidosJugadosPorClan)




export default router