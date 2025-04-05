import { Router } from "express";
import { getAllTwitchStreams } from "../controllers/stream.controller.js";

const router = Router()

router.get("/", getAllTwitchStreams)




export default router