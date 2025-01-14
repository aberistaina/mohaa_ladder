import { Router } from "express";
import { crearPlayer, obtenerPlayerById, obtenerPlayers, obtenerClanPorEtapa, validarCuenta, editarPlayer } from "../controllers/player.controller.js";
import { verificarToken } from "../middlewares/login.middleware.js";




const router = Router()

router.post("/", crearPlayer)
router.get("/", obtenerPlayers)
router.get("/:id", obtenerPlayerById)
router.get("/obtenerCLanEtapa/:idUser/:idEtapa", obtenerClanPorEtapa)
router.get("/validar/:email",verificarToken, validarCuenta)
router.put("/editar/:id", editarPlayer)




export default router