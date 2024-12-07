import { Router } from "express";
import { crearEtapa, obtenerEtapas } from "../controllers/etapas.controller.js";


const router = Router()

router.get("/", obtenerEtapas)
router.post("/", crearEtapa)



export default router