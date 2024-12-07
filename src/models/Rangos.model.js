import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Rango = sequelize.define('Rango', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: "rango",
    timestamps: false,
});
