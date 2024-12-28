import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Clan } from "./Clan.model.js"; 
import { Etapa } from "./Etapa.model.js";
import { Juego } from "./Juego.model.js";

export const Ladder = sequelize.define(
    "Ladder",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        comentario: {
            type: DataTypes.TEXT,
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        id_clan_ganador: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Clan,
                key: "id",
            },
        },
        id_clan_perdedor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Clan,
                key: "id",
            },
        },
        id_etapa: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Etapa,
                key: "id",
            },
        },
        id_juego: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Juego,
                key: "id",
            },
        },
    },
    {
        tableName: "ladder",
        timestamps: false,
    }
);

