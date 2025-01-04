import { Router } from "express";
import { crearPlayer, obtenerPlayerById, obtenerPlayers, obtenerClanPorEtapa } from "../controllers/player.controller.js";




const router = Router()

router.post("/", crearPlayer)
router.get("/", obtenerPlayers)
router.get("/:id", obtenerPlayerById)
router.get("/obtenerCLanEtapa/:idUser/:idEtapa", obtenerClanPorEtapa)



export default router