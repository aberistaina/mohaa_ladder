import { Juego } from "./Juego.model.js";
import { Etapa } from "./Etapa.model.js";
import { Clan } from "./Clan.model.js";
import { Ladder } from "./Ladder.model.js";
import { Player } from "./Player.model.js";
import { PlayerClan } from "./PlayerClan.model.js"
import { Rango } from "./Rangos.model.js"

// Asociación entre Juego y Etapa
Juego.hasMany(Etapa, {
    foreignKey: "id_juego",
    as: "etapas",
});
Etapa.belongsTo(Juego, {
    foreignKey: "id_juego",
    as: "juego",
});

// Asociación entre Etapa y Clan
Etapa.hasMany(Clan, {
    foreignKey: "id_etapa",
    as: "clanes",
});
Clan.belongsTo(Etapa, {
    foreignKey: "id_etapa",
    as: "etapa",
});

// Asociación entre Clan y Ladder (relación con el clan ganador)
Clan.hasMany(Ladder, {
    foreignKey: "id_clan_ganador",
    as: "ladder_ganador",
});
Ladder.belongsTo(Clan, {
    foreignKey: "id_clan_ganador",
    as: "ganador",
});

// Asociación entre Clan y Ladder (relación con el clan perdedor)
Clan.hasMany(Ladder, {
    foreignKey: "id_clan_perdedor",
    as: "ladder_perdedor",
});
Ladder.belongsTo(Clan, {
    foreignKey: "id_clan_perdedor",
    as: "perdedor",
});

// Asociación entre Etapa y Ladder
Etapa.hasMany(Ladder, {
    foreignKey: "id_etapa",
    as: "ladder_etapa",
});
Ladder.belongsTo(Etapa, {
    foreignKey: "id_etapa",
    as: "etapa",
});


// Asociación entre Player y Clan (a través de PlayerClan)
Player.belongsToMany(Clan, {
    through: PlayerClan,
    foreignKey: "player_id",
    as: "clanes",
});
Clan.belongsToMany(Player, {
    through: PlayerClan,
    foreignKey: "clan_id",
    as: "players",
});

// Asociación entre PlayerClan y Rango
Rango.hasMany(PlayerClan, {
    foreignKey: "rank_id",
    as: "player_clans",
});
PlayerClan.belongsTo(Rango, {
    foreignKey: "rank_id",
    as: "rango",
});