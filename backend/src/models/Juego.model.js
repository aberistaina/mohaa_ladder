import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Juego = sequelize.define("Juego", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: "juego",
    timestamps: false,
});

