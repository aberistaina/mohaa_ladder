import { Router } from "express";
import { crearClan, ingresarPlayerClan, obtenerClan, obtenerClanes } from "../controllers/clanes.controller.js";




const router = Router()

router.get("/", obtenerClanes)
router.get("/:id", obtenerClan)
router.post("/", crearClan)
router.post("/ingresarClan", ingresarPlayerClan)



export default router