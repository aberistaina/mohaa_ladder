import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Player = sequelize.define('Player', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
    },
    victorias: {
        type: DataTypes.INTEGER,
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    derrotas: {
        type: DataTypes.INTEGER,
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'player',
    timestamps: false,
});
