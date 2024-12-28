import { Router } from "express";
import { crearPlayer, obtenerPlayers } from "../controllers/player.controller.js";




const router = Router()

router.post("/", crearPlayer)
router.get("/", obtenerPlayers)




export default router