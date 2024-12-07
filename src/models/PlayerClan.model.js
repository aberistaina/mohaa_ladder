import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Player } from './Player.model.js';
import { Clan } from './Clan.model.js';

export const PlayerClan = sequelize.define('PlayerClan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    joined_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'player_clan',
    timestamps: false,
});

Player.belongsToMany(Clan, { through: PlayerClan, foreignKey: 'player_id' });
Clan.belongsToMany(Player, { through: PlayerClan, foreignKey: 'clan_id' });
