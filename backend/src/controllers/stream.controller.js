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

        const streamers = ["spiderrojo", "rubius",]; 
        const query = streamers.map((u) => `user_login=${u}`).join("&");

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

        res.status(200).json({
            code: 200,
            message: "Streams activos",
            data: data.data,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            code: 500,
            message: "Hubo un error interno en el servidor",
        });
    }
};
