import { Router } from "express";
import { crearClan, obtenerClanes } from "../controllers/clanes.controller.js";




const router = Router()

router.get("/", obtenerClanes)
router.post("/", crearClan)



export default router