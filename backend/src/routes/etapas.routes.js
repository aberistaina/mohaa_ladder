import { Router } from "express";
import { crearEtapa, obtenerEtapas, obtenerEtapasPorJuego } from "../controllers/etapas.controller.js";


const router = Router()

router.get("/", obtenerEtapas)
router.get("/:id", obtenerEtapasPorJuego)
router.post("/", crearEtapa)



export default router