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
            <div className="w-80 mr-3 max-w-full mx-auto p-6 border border-slate-500 bg-slate-900 rounded shadow-md md:w-auto md:mt-2 md:mr-auto">
                <PlayerInfoCard player={player}/>
                <DetalleClanesJugador player={player} />
            </div>
        </>
    );
};
