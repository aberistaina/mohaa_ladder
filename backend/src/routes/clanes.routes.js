import { Router } from "express";
import { crearClan, editarClan, expulsarJugador, ingresarPlayerClan, obtenerClan, obtenerClanes, obtenerClanesParaReporte, obtenerClanesPorEtapa } from "../controllers/clanes.controller.js";
import { verificarToken } from "../middlewares/login.middleware.js";




const router = Router()

router.get("/", obtenerClanes)
router.get("/:id", obtenerClan)
router.get("/etapa/:id", obtenerClanesPorEtapa)
router.get("/obtenerCLanReporte/:idEtapa/:idClanPerdedor", obtenerClanesParaReporte)
router.post("/", verificarToken, crearClan)
router.post("/ingresarClan", verificarToken, ingresarPlayerClan)
router.post("/editar/:id", verificarToken,  editarClan)
router.delete("/eliminar", verificarToken, expulsarJugador)



export default router