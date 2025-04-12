import { Player } from "../models/Player.model.js";
import { Op } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

let ACCESS_TOKEN = null;
let TOKEN_EXPIRATION = null;

const getNewAccessToken = async () => {
    const res = await fetch("https://id.twitch.tv/oauth2/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`,
    });

    const data = await res.json();
    ACCESS_TOKEN = data.access_token;
    TOKEN_EXPIRATION = Date.now() + data.expires_in * 1000;
};

export const getAllTwitchStreams = async (req, res) => {
    try {
        if (!ACCESS_TOKEN || Date.now() >= TOKEN_EXPIRATION) {
            await getNewAccessToken();
        }

        const streamersMohaa = await Player.findAll({
            attributes: ["twitch"],
            raw: true,
            where: {
                twitch: {
                    [Op.ne]: null,
                    [Op.ne]: "",
                },
            },
        });

        const streamersMohaaMap = streamersMohaa.map(
            (streamer) => streamer.twitch
        );

        const query = streamersMohaaMap.map((u) => `user_login=${u}`).join("&");

        const twitchRes = await fetch(
            `https://api.twitch.tv/helix/streams?${query}`,
            {
                headers: {
                    "Client-ID": CLIENT_ID,
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
            }
        );

        const data = await twitchRes.json();
        const onlineLogins = data.data.map(
            (user) => user.user_login || user.login
        );
        const offlineStreamers = streamersMohaa.filter((streamer) => {
            return !onlineLogins.includes(streamer.twitch.toLowerCase());
        });

        const offlineStreamersMap = offlineStreamers.map(
            (streamer) => streamer.twitch
        );

        const offlineQuery = offlineStreamersMap
            .map((u) => `login=${u}`)
            .join("&");

        const usersRes = await fetch(
            `https://api.twitch.tv/helix/users?${offlineQuery}`,
            {
                headers: {
                    "Client-ID": CLIENT_ID,
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
            }
        );

        const usersData = await usersRes.json();
        const validUsernames = usersData.data.map((user) =>
            user.login.toLowerCase()
        );

        const offlineStreamersValidados = offlineStreamersMap.filter(
            (username) => validUsernames.includes(username.toLowerCase())
        );

        const datosStreamers = {
            online: data.data,
            ofline: offlineStreamersValidados,
        };

        res.status(200).json({
            code: 200,
            message: "Streams activos",
            data: datosStreamers,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor",
        });
    }
};
