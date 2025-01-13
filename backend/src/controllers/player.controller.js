import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { Player } from "../models/Player.model.js";
import { Clan } from "../models/Clan.model.js";
import { Etapa } from "../models/Etapa.model.js";
import { enviarCorreo } from "../utils/emails.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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
        console.log(req.body);
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
        
        const secret = process.env.SECRET;
        const token = jwt.sign(
            {
                data: usuarioLegible.email,
            },
            secret,
            { expiresIn: "1h" }
        );

        enviarCorreo(email, "Nuevo Usuario", token);

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
