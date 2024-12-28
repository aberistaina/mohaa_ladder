import { Router } from "express";
import { crearPlayer, obtenerPlayerById, obtenerPlayers } from "../controllers/player.controller.js";




const router = Router()

router.post("/", crearPlayer)
router.get("/", obtenerPlayers)
router.get("/:id", obtenerPlayerById)



export default router