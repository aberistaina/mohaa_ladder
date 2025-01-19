import { Router } from "express";
import { aceptarInvitacion, enviarInvitacion, obtenerInvitacionesPorId, rechazarInvitacion } from "../controllers/invitaciones.controller.js";
import { verificarToken } from "../middlewares/login.middleware.js";

const router = Router()

router.get("/:playerId", obtenerInvitacionesPorId)
router.post("/", verificarToken, enviarInvitacion)
router.post("/aceptar", verificarToken, aceptarInvitacion)
router.post("/rechazar", verificarToken, rechazarInvitacion)



export default router