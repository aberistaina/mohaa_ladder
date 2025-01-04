import { Op } from "sequelize";
import { Clan } from "../models/Clan.model.js";
import { Player } from "../models/Player.model.js";
import { PlayerClan } from "../models/PlayerClan.model.js";

export const crearClan = async(req, res) =>{
    try {
        const { nombre, tag, id_etapa } = req.body
        if(!nombre || !tag || !id_etapa){
            res.status(400).json({
                code:400,
                message: "Todos los campos son requeridos"
            })
        }else{
            const nuevoClan = await Clan.create({
                nombre, 
                tag, 
                id_etapa})
                
            res.status(201).json({
                code:201,
                message: "Clan Creado Con éxito",
                data: nuevoClan
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

export const obtenerClanes = async(req, res) =>{
    try {
        const clanes = await Clan.findAll({
            order: [["ranking_actual", "ASC"]]
        })
        res.status(200).json({
            code:200,
            message: "Clanes obtenidos Con éxito",
            data: clanes
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor"
        })
    }
}

export const obtenerClan = async(req, res) =>{
    try {
        const { id } = req.params
        const clan = await Clan.findOne({
            include:[{
                model: Player,
                attributes: ["username", "victorias", "derrotas"],
                as: "players",
                through:{
                model: PlayerClan,
                attributes: []
                }
            }],
            where:{
                id
            }
        })
        res.status(200).json({
            code:200,
            message: "Clan obtenido Con éxito",
            data: clan
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor"
        })
    }
}

export const obtenerClanesParaReporte = async(req, res) =>{
    try {

        const { idEtapa, idClanPerdedor } = req.params

        const clanes = await Clan.findAll({
            order: [["ranking_actual", "ASC"]],
            where: {
                id_etapa: idEtapa,
                id: {
                    [Op.ne]: idClanPerdedor,
                },
            },
        })
        res.status(200).json({
            code:200,
            message: "Clanes obtenidos Con éxito",
            data: clanes
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor"
        })
    }
}

export const ingresarPlayerClan = async(req, res) =>{
    try {

        const { player_id, clan_id } = req.body

        await PlayerClan.create({   
            player_id,
            clan_id,
            rank_id: 1

        })

        res.status(200).json({
            code:200,
            message: "Jugador ingresado correctamente al clan",

        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor"
        })
    }
}