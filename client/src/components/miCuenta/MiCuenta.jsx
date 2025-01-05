import { useEffect, useState } from "react";
import { obtenerLocalStorage } from "../../hooks/localStorage";
import { fetchHook } from "../../hooks/fetchHook";
import { PlayerInfoCard } from "./PlayerInfoCard";
import { PlayerClanCard } from "./PlayerClanCard";
import { PlayerInvitacionCard } from "./PlayerInvitacionCard";

export const MiCuenta = () => {
    const [player, setPlayer] = useState({});

    useEffect(() => {
        const getInfoPlayer = async () => {
            const { playerData } = obtenerLocalStorage();
            const url = `http://localhost:3000/api/v1/players/${playerData.id}`;
            const method = "GET";
            const data = await fetchHook(url, method);
            setPlayer(data.data);
            console.log(data.data);
            {
                /* Modifique el controlador, así que hay que solucionar la respuesta */
            }
        };
        getInfoPlayer();
    }, []);

    return (
        <>
            <div className="max-w-4xl mx-auto p-6 border border-slate-500 bg-slate-900 rounded shadow-md">
                <PlayerInfoCard player={player} />
                <PlayerClanCard player={player} />
                <PlayerInvitacionCard player={player} />
            </div>
        </>
    );
};
