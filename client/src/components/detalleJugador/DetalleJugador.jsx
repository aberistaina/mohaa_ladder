import { useEffect, useState } from "react";
import { fetchHook } from "../../hooks/fetchHook";
import { useParams } from 'react-router-dom'
import { PlayerInfoCard } from "../miCuenta/PlayerInfoCard"
import { DetalleClanesJugador } from "./DetalleClanesJugador";


export const DetalleJugador = () => {
    const [player, setPlayer] = useState({});
    const { id } = useParams();

    useEffect(() => {
        try {
            const getInfoPlayer = async () => {
                const url = `http://localhost:3000/api/v1/players/${id}`;
                const method = "GET";
                const data = await fetchHook(url, method);
                setPlayer(data.data);
            };
            getInfoPlayer();
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    return (
        <>
            <div className="max-w-4xl mx-auto p-6 border border-slate-500 bg-slate-900 rounded shadow-md">
                <PlayerInfoCard player={player}/>
                <DetalleClanesJugador player={player} />
            </div>
        </>
    );
};
