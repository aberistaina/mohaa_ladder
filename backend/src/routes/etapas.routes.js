import { Router } from "express";
import { crearEtapa, obtenerEtapas, obtenerEtapasPorJuego, obtenerEtapaPorId } from "../controllers/etapas.controller.js";


const router = Router()

router.get("/", obtenerEtapas)
router.get("/:id", obtenerEtapaPorId)
router.get("/juego/:id", obtenerEtapasPorJuego)
router.post("/", crearEtapa)



export default router