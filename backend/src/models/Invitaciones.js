import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Clan } from './Clan.model.js';
import { Player } from './Player.model.js';
import { Etapa } from './Etapa.model.js';

export const Invitacion = sequelize.define('Invitacion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Player, 
            key: "id",
        },
    },
    clan_id: {
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
    estado: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "pendiente", 
    },
    fecha_envio: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    fecha_respuesta: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, 
{
    tableName: 'invitaciones',
    timestamps: false,
});
