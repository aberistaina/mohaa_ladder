import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Etapa } from "./Etapa.model.js";

export const Clan = sequelize.define("Clan", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    tag: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    imagen:{
        type: DataTypes.STRING,
        defaultValue: "https://st3.depositphotos.com/9468312/12912/v/450/depositphotos_129128076-stock-illustration-gray-man-avatar.jpg"
    },
    id_etapa: {
        type: DataTypes.INTEGER,
        references: {
            model: Etapa,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    ranking_actual: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ultimo_ranking: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ultimo_registro: {
        type: DataTypes.STRING(255),
        default: "sin registro"
    },
    mejor_ranking: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    triunfos: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    derrotas: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    juegos: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    porcentaje_triunfos: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    racha_actual: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    mejor_racha: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    peor_racha: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    dias_inactivos: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    fecha_ultima_actividad: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "clan", 
    timestamps: false, 
});

