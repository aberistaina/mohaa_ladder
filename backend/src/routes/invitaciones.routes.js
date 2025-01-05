import { Router } from "express";
import { enviarInvitacion, obtenerInvitacionesPorId } from "../controllers/invitaciones.controller.js";

const router = Router()

router.get("/:playerId", obtenerInvitacionesPorId)
router.post("/", enviarInvitacion)



export default router