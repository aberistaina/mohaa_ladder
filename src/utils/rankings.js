import { Clan } from "../models/Clan.model.js"

export const nuevoRankingCLanUnranked = async(id_clan_gandor) =>{
    try {

        const mejorRankingActual = await obtenerUltimoRanking()
        return mejorRankingActual

    } catch (error) {
        console.log(error.message);
    }
}

export const obtenerRankingActual = async(id_clan) =>{
    try {
        const rankingActual = await Clan.findOne({
            attributes: ["id", "nombre", "ranking_actual"],
            where:{
                id: id_clan
            }
        });
        return rankingActual.toJSON().ranking_actual
    } catch (error) {
        console.log(error.message);
    }
}

export const obtenerUltimoRanking = async() =>{
    try {
        let mejorRankingActual = 0
        const rankingActuales = await Clan.findAll({
            raw:true,
            attributes: ["id", "nombre", "ranking_actual"],
            order: [["ranking_actual", "ASC"]],
        });

        rankingActuales.map((clan=>{
            if(clan.ranking_actual > mejorRankingActual){
                mejorRankingActual = clan.ranking_actual
            }
        }))
        return mejorRankingActual + 1
    } catch (error) {
        console.log(error.message);
    }
}

export const calcularAscensoRanking = async(rankingGanador, rankingPerdedor) =>{
    try {
        

        const diferenciaDePuestos = Math.floor((rankingGanador - rankingPerdedor) /2)
        const nuevoRankingGanador = rankingGanador - diferenciaDePuestos

        return nuevoRankingGanador

    } catch (error) {
        console.log(error.message);
    }
}