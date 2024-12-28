import { Router } from "express";
import { crearPlayer } from "../controllers/player.controller.js";




const router = Router()

router.post("/", crearPlayer)




export default router