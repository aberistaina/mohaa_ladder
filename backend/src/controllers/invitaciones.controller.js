import { Invitacion } from "../models/Invitaciones.js";
import { PlayerClan } from "../models/PlayerClan.model.js";

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