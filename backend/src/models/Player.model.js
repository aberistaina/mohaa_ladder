import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { type } from 'os';

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
    password:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
    },
    volute: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    victorias: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    derrotas: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    admin:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    validado:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    imagen:{
        type: DataTypes.STRING,
        defaultValue: "https://st3.depositphotos.com/9468312/12912/v/450/depositphotos_129128076-stock-illustration-gray-man-avatar.jpg"
    },
    twitch:{
        type:DataTypes.STRING,
        default: null
    },
    youtube:{
        type:DataTypes.STRING,
        default: null
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'player',
    timestamps: false,
});
