import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Juego } from "./Juego.model.js";


export const Etapa = sequelize.define("Etapa", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    id_juego: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Juego,
            key: "id"
        }
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    fecha_creacion: {
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW, 
    },
}, {
    tableName: "etapa",
    timestamps: false,
    freezeTableName: true
});
