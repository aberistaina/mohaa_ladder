import { Router } from "express";
import { crearClan, editarClan, expulsarJugador, ingresarPlayerClan, obtenerClan, obtenerClanes, obtenerClanesParaReporte, obtenerClanesPorEtapa } from "../controllers/clanes.controller.js";




const router = Router()

router.get("/", obtenerClanes)
router.get("/:id", obtenerClan)
router.get("/etapa/:id", obtenerClanesPorEtapa)
router.get("/obtenerCLanReporte/:idEtapa/:idClanPerdedor", obtenerClanesParaReporte)
router.post("/", crearClan)
router.post("/ingresarClan", ingresarPlayerClan)
router.post("/editar/:id", editarClan)
router.delete("/eliminar", expulsarJugador)



export default router