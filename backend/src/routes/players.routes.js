import { Router } from "express";
import { crearPlayer, obtenerPlayerById, obtenerPlayers, obtenerClanPorEtapa, validarCuenta, editarPlayer, enviarNuevoEmailValidacion, recuperarContraseña, cambiarContraseña, abandonarClan } from "../controllers/player.controller.js";
import { verificarToken } from "../middlewares/login.middleware.js";




const router = Router()

router.post("/", crearPlayer)
router.get("/", obtenerPlayers)
router.get("/:id", obtenerPlayerById)
router.get("/obtenerCLanEtapa/:idUser/:idEtapa", obtenerClanPorEtapa)
router.get("/validar/:email",verificarToken, validarCuenta)
router.get("/reenviar-validacion/:email", enviarNuevoEmailValidacion)
router.put("/editar/:id", verificarToken,  editarPlayer)
router.post("/recuperar-password", recuperarContraseña)
router.post("/modificar-password/:email", verificarToken, cambiarContraseña)
router.delete("/dejar-clan",verificarToken, abandonarClan)




export default router