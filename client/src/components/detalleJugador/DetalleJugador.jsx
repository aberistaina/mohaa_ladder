import { useEffect, useState } from "react";
import { fetchHook } from "../../hooks/fetchHook";
import { useParams } from 'react-router-dom'
import { PlayerInfoCard } from "../miCuenta/PlayerInfoCard"
import { DetalleClanesJugador } from "./DetalleClanesJugador";
import { useNavigate } from "react-router-dom";


export const DetalleJugador = () => {
    const [player, setPlayer] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

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
        <div>
            <div className="w-80 mr-3 max-w-full mx-auto p-6 border border-slate-500 bg-slate-900 rounded shadow-md md:w-auto md:mt-2 md:mr-auto">
                <PlayerInfoCard player={player}/>
                <DetalleClanesJugador player={player} />
            </div>
            <div className="flex justify-center mt-2">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-slate-800 text-white px-2 py-1 rounded-lg transition-all duration-300 text-lg font-semibold hover:bg-slate-700 hover:-translate-x-1"
                    >
                        ← Volver
                </button>
            </div>
        </div>
    );
};
