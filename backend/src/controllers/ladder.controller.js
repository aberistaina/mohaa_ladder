import { sequelize } from "../database/database.js";
import { Op } from "sequelize";
import { Juego } from "../models/Juego.model.js";
import { Clan } from "../models/Clan.model.js";
import { Ladder } from "../models/Ladder.model.js";
import { calcularAscensoRanking, nuevoRankingCLanUnranked, obtenerRankingActual } from "../utils/rankings.js";


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

    const transaction = await sequelize.transaction()
    try {
        
        const { id_clan_ganador , id_clan_perdedor, id_etapa, id_juego, comentario, rango } = req.body
        

        const rangosPermitidos = ["Lider", "Co-Lider", "Capitán"]

        if(id_clan_perdedor === undefined || id_clan_perdedor === null){
            return res.status(400).json({
                code:400,
                message: "Debes pertenecer a un clan dentro de esta etapa para poder reportar"
            })
        }

        if(!rangosPermitidos.includes(rango)){
            return res.status(400).json({
                code:400,
                message: "No tienes un Rango Permitido para poder reportar"
            })
        }

        const rankingGanador = await obtenerRankingActual(id_clan_ganador)
        const rankingPerdedor = await obtenerRankingActual(id_clan_perdedor)
        const nombreClanGanador = await Clan.findOne({where: {id: id_clan_ganador}})
        const nombreClanPerdeor = await Clan.findOne({where: {id: id_clan_perdedor}})
        let nuevoRankingGanador



        //Si el clan está unranked queda en el último lugar de la tabla
        if(rankingGanador === 0){
            nuevoRankingGanador = await nuevoRankingCLanUnranked()
        }
        //Si el clan ganador tiene peor ranking pero más de un lugar de diferencia se calcula el nuevo lugar
        else if(rankingGanador - rankingPerdedor > 1 && rankingPerdedor != 0){
            nuevoRankingGanador = await calcularAscensoRanking(rankingGanador, rankingPerdedor)
        }
        //si el clan ganador solo tiene un lugar de diferencia, automáticamente sube un lugar y el otro clan baja uno
        else if(rankingGanador - rankingPerdedor == 1){
            nuevoRankingGanador = rankingPerdedor
        }
        //en todos los demás casos el clan ganador mantiene su lugar
        else{
            nuevoRankingGanador = rankingGanador
        }

        if(nuevoRankingGanador != rankingGanador){
            await Clan.update(
                {
                    ranking_actual: nuevoRankingGanador,
                    ultimo_ranking: rankingGanador,
                },
                {
                    where: {
                        id: id_clan_ganador
                    }
                }
            )

            await Clan.update(
                { ultimo_ranking: sequelize.literal("ranking_actual") },
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
                juegos: sequelize.literal('juegos + 1'),
                racha_actual: sequelize.literal(`
                    CASE 
                        WHEN racha_actual <= 0 THEN 1
                        ELSE racha_actual + 1
                    END
                `),
                ultimo_registro: `Derrotó a ${nombreClanPerdeor.nombre}`
            },
            {
                where: {
                    id: id_clan_ganador
                }
            }
        )
        
        //Actualizar Juegos y Derrotas Clan Perdedor
        await Clan.update(
            {
                derrotas: sequelize.literal('derrotas + 1'),
                juegos: sequelize.literal('juegos + 1'),
                racha_actual: sequelize.literal(`
                    CASE 
                        WHEN racha_actual > 0 THEN 0
                        ELSE racha_actual - 1
                    END
                `),
                ultimo_registro: `Perdió Contra ${nombreClanGanador.nombre}`
            },
            {
                where: {
                    id: id_clan_perdedor
                }
            }
        )

        //Crear la entrada en la tabla de Ladders

        await Ladder.create({
            id_juego,
            id_clan_ganador,
            id_clan_perdedor,
            id_etapa,
            comentario
        })
        await transaction.commit() 


        res.status(200).json({
            code:200,
            message: "Reporte realizado con éxito",
        })
    } catch (error) {
        console.log(error.message);
        await transaction.rollback();
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor"
        })
    }
}