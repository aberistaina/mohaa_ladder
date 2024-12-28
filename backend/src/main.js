import express from "express"
import cors from "cors"
import etapasRoutes  from "./routes/etapas.routes.js"
import juegosRoutes  from "./routes/juegos.routes.js"
import clanesRoutes  from "./routes/clanes.routes.js"
import ladderRoutes  from "./routes/ladder.routes.js"
import playersRoutes  from "./routes/players.routes.js"
import loginRoutes  from "./routes/login.routes.js"


import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const app = express()


//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


//Carpeta Publica
app.use("/public", express.static(__dirname + "/public"));

//Endpoints
app.use("/api/v1/juegos", juegosRoutes)
app.use("/api/v1/etapas", etapasRoutes)
app.use("/api/v1/clanes", clanesRoutes)
app.use("/api/v1/ladder", ladderRoutes)
app.use("/api/v1/players", playersRoutes)
app.use("/api/v1/login", loginRoutes)


