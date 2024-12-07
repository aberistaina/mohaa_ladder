import { Clan } from "../models/Clan.model.js"

export const calcularNuevoRaking = async(id_clan_gandor, id_clan_perdedor) =>{
    try {
        const rankingClanGanador = await obtenerRankingActual(id_clan_gandor)
        
        if(rankingClanGanador.ranking_actual === 0){
            const mejorRankingActual = await obtenerUltimoRanking()
            return mejorRankingActual
        }else{
            //terminar esta lógica
        }

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
        return rankingActual.toJSON()
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