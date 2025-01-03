import bcrypt from "bcrypt";
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
            res.status(400).json({
                code: 400,
                message: "Todos los campos son requeridos",
            });
        } else {
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
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor",
        });
    }
};
