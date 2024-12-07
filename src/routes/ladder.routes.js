import { Router } from "express";
import { ranking } from "../controllers/ladder.controller.js";




const router = Router()

router.get("/", ranking)




export default router