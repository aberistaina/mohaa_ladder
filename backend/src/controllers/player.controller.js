import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { sequelize } from "../database/database.js";
import { Player } from "../models/Player.model.js";
import { Clan } from "../models/Clan.model.js";
import { Etapa } from "../models/Etapa.model.js";
import { PlayerClan } from "../models/PlayerClan.model.js";
import { enviarCorreo } from "../utils/emails.js";
import { crearNuevoToken } from "../utils/validarCuentasYRecuperarPassword.js";


export const obtenerPlayers = async (req, res) => {
    try {
        const players = await Player.findAll({
            attributes:{ exclude: ["password"] }
        });

        res.status(201).json({
            code: 201,
            message: "Playes encontrados Con éxito",
            data: players,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor",
        });
    }
};

export const obtenerPlayerById = async (req, res) => {
    try {
        const { id } = req.params;
        const player = await Player.findOne({
            attributes: { exclude: ["password"] },
            where: {
                id,
            },
            include: [
                {
                    model: Clan,
                    as: "clanes",
                    through: { attributes: ["joined_at", "rango"] },
                    include: [
                        {
                            model: Etapa,
                            as: "etapa",
                        },
                    ],
                },
            ],
            raw: false,
            nest: true,
        });

        if (!player) {
            return res.status(404).json({
                code: 404,
                message: "Jugador no encontrado",
            });
        }

        res.status(201).json({
            code: 201,
            message: "Jugador encontrado con éxito",
            data: player,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor",
        });
    }
};

export const crearPlayer = async (req, res) => {
    try {
        const { username, email, password, volute } = req.body;
        const hash = bcrypt.hashSync(password, 10);

        if (!username || !email || !password || !volute) {
            return res.status(400).json({
                code: 400,
                message: "Todos los campos son requeridos",
            });
        }

        const usuario = await Player.findOne({
            where: {
                [Op.or]: [{ username }, { email }],
            },
        });

        if (usuario) {
            if (usuario.username === username) {
                return res.status(400).json({
                    code: 400,
                    message: "Ya hay un jugador con ese nombre",
                });
            }

            if (usuario.email === email) {
                return res.status(400).json({
                    code: 400,
                    message: "Ya hay un jugador registrado con ese email",
                });
            }
        }

        const nuevoUsario = await Player.create({
            username,
            email,
            volute,
            password: hash,
        });

        const usuarioLegible = nuevoUsario.toJSON();
        
        const token = crearNuevoToken(usuarioLegible, "48h")
        
        enviarCorreo(email, "validar", token);

        res.status(201).json({
            code: 201,
            message: "Usuario Creado Con éxito",
            data: nuevoUsario,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor",
        });
    }
};

export const obtenerClanPorEtapa = async (req, res) => {
    try {
        const { idUser, idEtapa } = req.params;

        const players = await Player.findOne({
            attributes: ["id", "username"],
            where: {
                id: idUser,
            },
            include: [
                {
                    attributes: ["id", "nombre"],
                    model: Clan,
                    as: "clanes",
                    exclude: ["PlayerClan"],
                    where: {
                        id_etapa: idEtapa,
                    },
                },
            ],
        });

        if (players == null) {
            return res.status(400).json({
                code: 400,
                message:
                    "Debes estar en un clan en esta etapa para poder reportar",
            });
        }

        const datosPlayer = {
            id: players.id,
            username: players.username,
            clanes: players.clanes[0].id,
            rango: players.clanes[0].PlayerClan.rango,
        };

        res.status(200).json({
            code: 200,
            message: "Playes encontrados Con éxito",
            data: datosPlayer,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor",
        });
    }
};

export const validarCuenta = async (req, res) => {
    try {
        const { email } = req.params;

        const player = await Player.findOne({
            where:{
                email
            }
        })

        if(player.validado){
            return res.status(400).json({
                code: 400,
                message:
                    "Este usuario ya está validado",
            }); 
        }

        await Player.update(
            {
                validado: true,
            },
            {
                where: {
                    email
                },
            }
        );

        res.status(200).json({
            code: 200,
            message: "Usuario Validado",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor",
        });
    }
};

export const enviarNuevoEmailValidacion = async(req, res) =>{
    try {

        const { email } = req.params

        const player = await Player.findOne(
            {
                where:{
                    email
                }
            }  
        );

        if(!player){
            return res.status(400).json({
                code: 400,
                message:
                    "No existe ninguna cuenta vinculada a ese correo electrónico",
            });
        }

        if(player.validado){
            return res.status(400).json({
                code: 400,
                message:
                    "Tu cuenta ya está validada",
            });
        }

        const token = crearNuevoToken(email, "10m")
        enviarCorreo(email, "nuevaValidacion", token);

        res.status(200).json({
            code: 200,
            message: "Correo enviado con éxito",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor",
        });
    }
}

export const editarPlayer = async(req, res) =>{
    try {
        const { id } = req.params
        const {username, volute, imagen, twitch, youtube} = req.body

        const usernameRepetido = await Player.findOne({
            where:{
                username,
                id: {
                    [Op.not]: id
                }
            }
        })

        if(usernameRepetido){
            return res.status(400).json({
                code: 400,
                message: "Ya existe un jugador con ese nombre"
            });
        }

        await Player.update(
            {
                username,
                volute,
                imagen,
                twitch,
                youtube
            },
            {
                where: {
                    id
                },
            }
        );
        res.status(200).json({
            code: 200,
            message: "Jugador Modificado con éxito",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor",
        });
    }
}

export const recuperarContraseña = async(req, res) =>{

    try {
        const { email } = req.body

        const player = await Player.findOne(
            {
                where:{
                    email
                }
            }  
        );

        if(!player){
            return res.status(400).json({
                code: 400,
                message:
                    "No existe ninguna cuenta vinculada a ese correo electrónico",
            });
        }
        
        const token = crearNuevoToken(email, "10m")
        enviarCorreo(email, "recuperarPassword", token);

        res.status(200).json({
            code: 200,
            message: "Email de recuperación Enviado",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor",
        }); 
    }
}

export const cambiarContraseña = async(req, res) =>{

    try {
        const { password, repeatPassword } = req.body
        const { email } = req.params
        const { token } = req.query

        if(password != repeatPassword){
            return res.status(400).json({
                code: 400,
                message: "Las contraseñas no coinciden",
            });
        }
        
        const hash = bcrypt.hashSync(password, 10); 

        const playerInfo = await Player.findOne({ where: { email }, raw: true });
        const playerName = playerInfo.username;

        await Player.update({
            password: hash,
        },
        {
            where: {
                email
            },
        })

        enviarCorreo(email, "passwordModificada", token, playerName)
        res.status(200).json({
            code: 200,
            message: "Contraseña modificada con éxito",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor",
        }); 
    }
}

export const abandonarClan = async(req, res) =>{
    try {
        const { playerId, clanId} = req.body
        console.log(clanId);
        console.log(playerId);

        const players = await PlayerClan.findAll({
            where: {
                clan_id: clanId,
                player_id: { [Op.ne]: playerId }
            },
        })

        if (players.length === 0) {
            await PlayerClan.destroy({ where: { clan_id: clanId }, })
            await Clan.destroy({ where: { id: clanId }, });
            return res.status(200).json({
                code: 200,
                message: "Clan Eliminado",
            });
        }

        const otroLider = players.some(player => player.rango === "Lider");

        if (!otroLider) {
            return res.status(400).json({
                code: 400,
                message: "No puedes abandonar el clan sin dejar a otro líder",
            });
        }

        await PlayerClan.destroy({ where: { player_id:playerId, clan_id: clanId  }})


        res.status(200).json({
            code: 200,
            message: "Abandonaste el clan exitosamente",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor",
        });  
    }
}