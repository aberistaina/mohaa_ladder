import { Invitacion } from "../models/Invitaciones.js";
import { PlayerClan } from "../models/PlayerClan.model.js";
import { Clan } from "../models/Clan.model.js";
import { Etapa } from "../models/Etapa.model.js";


export const enviarInvitacion = async(req, res) =>{
    try {

        const { player_id, clan_id, id_etapa } = req.body

        const playerDentroDelClan = await PlayerClan.findOne({
            where:{
                player_id,
                id_etapa
            }
        })

        if(playerDentroDelClan){
            return res.status(400).json({
                code: 400,
                message: "El Jugador ya pertenece a un clan en esta Etapa",
            });  
        }

        const nuevaInvitacion = await Invitacion.create({
            player_id,
            clan_id,
            id_etapa
        })

        res.status(201).json({
            code: 201,
            message: "Invitación Enviada Correctamente",
            data: nuevaInvitacion
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor",
        });
    }
}

export const obtenerInvitacionesPorId = async(req, res) =>{
    try {

        const { playerId } = req.params

        const invitaciones = await Invitacion.findAll({
            include: [
                {
                    model: Clan,
                    attributes: ["nombre"],
                    as: "clanes",
                },
                {
                    model: Etapa,
                    attributes: ["nombre"],
                    as: "etapa",
                },
            ],
            where:{
                player_id: playerId
            },
            raw: true,
            nest: true

        })

        const invitacionesFormateadas = invitaciones.map(invitacion => ({
            ...invitacion, 
            clan: invitacion.clanes?.nombre, 
            etapa: invitacion.etapa?.nombre,
            clanes: undefined, 
        }));

        

        res.status(200).json({
            code: 200,
            message: "Invitaciones encontradas correctamente",
            data: invitacionesFormateadas
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor",
        });
    }
}