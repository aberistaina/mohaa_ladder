import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { Player } from "../models/Player.model.js";
import { Clan } from "../models/Clan.model.js";
import { Etapa } from "../models/Etapa.model.js";


export const obtenerPlayers = async (req, res) => {
    try {
        const players = await Player.findAll();

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
        const player = await Player.findAll({
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
            raw: true,
            nest: true,
        });

        const formatPlayer = player.map((item) => {
            const clanes = Array.isArray(item.clanes)
                ? item.clanes
                : [item.clanes];
            return {
                ...item,
                clanes: clanes.map((clan) => ({
                    ...clan,
                    joined_at: clan.PlayerClan.joined_at,
                    rango: clan.PlayerClan.rango,
                    etapa_nombre: clan.etapa ? clan.etapa.nombre : null,
                })),
            };
        });

        res.status(201).json({
            code: 201,
            message: "Playes encontrados Con éxito",
            data: formatPlayer,
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
        const { username, email, password } = req.body;
        const hash = bcrypt.hashSync(password, 10);

        if (!username || !email || !password) {
            return res.status(400).json({
                code: 400,
                message: "Todos los campos son requeridos",
            });
        }

        const usuario = await Player.findOne({
            where: {
                [Op.or]: [
                    { username },  
                    { email}      
                ]
            }
        });

        if(usuario){
            if(usuario.username === username){
                return res.status(400).json({
                    code: 400,
                    message: "Ya hay un jugador con ese nombre",
                });
            } 
    
            if(usuario.email === email){
                return res.status(400).json({
                    code: 400,
                    message: "Ya hay un jugador registrado con ese email",
                });
            }
        };

        const nuevoUsario = await Player.create({
            username,
            email,
            password: hash,
        });

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
                 message: "Debes estar en un clan en esta etapa para poder reportar",
             });
         }

        const datosPlayer = {
            id: players.id,
            username: players.username,
            clanes: players.clanes[0].id,
            rango: players.clanes[0].PlayerClan.rango,
        }


        res.status(201).json({
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