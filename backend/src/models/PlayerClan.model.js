import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';


export const PlayerClan = sequelize.define('PlayerClan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rango: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    id_etapa: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    joined_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'player_clan',
    timestamps: false,
});
