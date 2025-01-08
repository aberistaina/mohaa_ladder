import { Router } from "express";
import { aceptarInvitacion, enviarInvitacion, obtenerInvitacionesPorId, rechazarInvitacion } from "../controllers/invitaciones.controller.js";

const router = Router()

router.get("/:playerId", obtenerInvitacionesPorId)
router.post("/", enviarInvitacion)
router.post("/aceptar", aceptarInvitacion)
router.post("/rechazar", rechazarInvitacion)



export default router