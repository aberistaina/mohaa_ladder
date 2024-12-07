import { Juego } from "../models/Juego.model.js";
import { Clan } from "../models/Clan.model.js";
import { calcularNuevoRaking } from "../utils/rankings.js";

export const crearJuego = async(req, res) =>{
    try {
        const { comentario, id_clan_ganador, id_clan_perdedor, id_etapa } = req.body
        
        if(!comentario || !id_clan_ganador || !id_clan_perdedor || id_etapa){
            res.status(400).json({
                code:400,
                message: "Todos los campos son requeridos"
            })

        }else{
            const nuevoLadder = await Juego.create({
                comentario, 
                id_clan_ganador, 
                id_clan_perdedor, 
                id_etapa
            })
            res.status(201).json({
                code:201,
                message: "Ladder creado Con éxito",
                data: nuevoLadder
            })
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor"
        })
    }
}

export const obtenerLadders = async(req, res) =>{
    try {
        const ladders = await Juego.findAll()
        res.status(200).json({
            code:200,
            message: "Ladders obtenidos Con éxito",
            data: ladders
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor"
        })
    }
}

export const ranking = async(req, res) =>{
    try {
        const rankingClanGanador = await calcularNuevoRaking(6)

        await Clan.update(
            {
            ranking_actual:rankingClanGanador
            },
            {
                where: {
                    id: 6
                }
            }
            )



        res.status(200).json({
            code:200,
            message: "Rankings obtenidos Con éxito",
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor"
        })
    }
}