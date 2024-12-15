import { sequelize } from "../database/database.js";
import { Op } from "sequelize";
import { Juego } from "../models/Juego.model.js";
import { Clan } from "../models/Clan.model.js";
import { calcularAscensoRanking, nuevoRankingCLanUnranked, obtenerRankingActual } from "../utils/rankings.js";

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

export const calcularNuevoRanking = async(req, res) =>{
    try {
        const transaction = await sequelize.transaction()
        const { id_clan_ganador , id_clan_perdedor } = req.body
        const rankingGanador = await obtenerRankingActual(id_clan_ganador)
        const rankingPerdedor = await obtenerRankingActual(id_clan_perdedor)
        let nuevoRankingGanador


        //Si el clan está unranked queda en el último lugar de la tabla
        if(rankingGanador === 0){
            nuevoRankingGanador = await nuevoRankingCLanUnranked()
        }
        //Si el clan ganador tiene peor ranking pero más de un lugar de diferencia se calcula el nuevo lugar
        else if(rankingGanador - rankingPerdedor > 1){
            nuevoRankingGanador = await calcularAscensoRanking(rankingGanador, rankingPerdedor)
        }
        //si el clan ganador solo tiene un lugar de diferencia, automáticamente sube un lugar y el otro clan baja uno
        else if(rankingGanador - rankingPerdedor == 1){
            nuevoRankingGanador = 1
        }
        //en todos los demás casos el clan ganador mantiene su lugar
        else{
            nuevoRankingGanador = rankingGanador
        }
      
        if(nuevoRankingGanador != rankingGanador){
            await Clan.update(
                {
                    ranking_actual: nuevoRankingGanador,
                    ranking_anterior: rankingGanador,
                },
                {
                    where: {
                        id: id_clan_ganador
                    }
                }
            )

            await Clan.update(
                { ranking_actual: sequelize.literal("ranking_actual + 1") },
                {
                    where: {
                        ranking_actual: {
                            [Op.between]: [nuevoRankingGanador , rankingGanador], 
                        },
                        id: {
                            [Op.ne]: id_clan_ganador
                        },
                    },
                }
            );

            
        }
        //Actualizar Juegos y Victorias Clan Ganador
        await Clan.update(
            {
                triunfos: sequelize.literal('triunfos + 1'),
                juegos: sequelize.literal('juegos + 1')
            },
            {
                where: {
                    id: id_clan_ganador
                }
            }
        )
        
        //Actualizar Juegos y Derrotas Clan Ganador
        await Clan.update(
            {
                derrotas: sequelize.literal('derrotas + 1'),
                juegos: sequelize.literal('juegos + 1')
            },
            {
                where: {
                    id: id_clan_perdedor
                }
            }
        )
        await transaction.commit() 


        res.status(200).json({
            code:200,
            message: "Reporte realizado con éxito",
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor"
        })
    }
}