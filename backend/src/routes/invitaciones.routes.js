import { Router } from "express";
import { enviarInvitacion } from "../controllers/invitaciones.controller.js";

const router = Router()

router.post("/", enviarInvitacion)



export default router