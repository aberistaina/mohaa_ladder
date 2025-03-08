import { useState, useContext } from "react";
import { fetchHook } from "../hooks/fetchHook";
import { obtenerLocalStorage } from "../hooks/localStorage";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { LoginContext } from "../context/LoginContext";
import { useSelector } from 'react-redux';

export const ReclutarPage = () => {
    const {clanId, etapaId } = useParams();
    const [playerId, setPlayerId] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    /* const { token } = useContext(LoginContext) */
    const token = useSelector((state) => state.auth.token);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {playerData} = obtenerLocalStorage();

        const body = {
            player_id: playerId,
            clan_id: clanId,
            id_etapa: etapaId,
            reclutador_id: playerData.id,
        };

        const url = `http://localhost:3000/api/v1/invitaciones/?token=${token}`;
        const method = "POST";
        const data = await fetchHook(url, method, body);

        if (data.code === 201) {
            enqueueSnackbar(data.message, { variant: "success" });
        } else {
            enqueueSnackbar(data.message, { variant: "error" });
        }
    };

    return (
        <div className="w-full max-w-md p-6 border border-slate-500 rounded">
            <h2 className="text-2xl font-bold text-center text-slate-100 mb-6">
                Reclutar Jugador
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="idJugador"
                        className="block text-sm font-semibold text-slate-300"
                    >
                        Id del Jugador
                    </label>
                    <input
                        type="text"
                        id="idJugador"
                        placeholder="Ingresa La Id del Jugador"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                        onChange={(e) => setPlayerId(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-slate-200 font-semibold bg-indigo-800 rounded-lg transition-all duration-300 hover:bg-indigo-900"
                    >
                        Reclutar
                    </button>
                </div>
            </form>
        </div>
    );
};
