import { useState, useContext } from "react";
import { fetchHook } from "../hooks/fetchHook";
import { obtenerLocalStorage } from "../hooks/localStorage";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { LoginContext } from "../context/LoginContext";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// Iconos
import { IoPersonAddOutline } from "react-icons/io5";

export const ReclutarPage = () => {
    const navigate = useNavigate();
    const {clanId, etapaId } = useParams();
    const [playerId, setPlayerId] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const token = useSelector((state) => state.auth.token);
    const playerData = useSelector((state) => state.auth.player);
    const player = playerData?.data;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            player_id: playerId,
            clan_id: clanId,
            id_etapa: etapaId,
            reclutador_id: player.id,
        };

        const url = `https://mohaax.cl/api/v1/invitaciones/?token=${token}`;
        const method = "POST";
        const data = await fetchHook(url, method, body);

        if (data.code === 201) {
            enqueueSnackbar(data.message, { variant: "success" });
        } else {
            enqueueSnackbar(data.message, { variant: "error" });
        }
    };

    return (
        <div className="w-full max-w-md p-6 border border-slate-500 rounded mr-3 mb-10 md:mb-0 md:mr-0 md:mt-2">
            <h2 className="text-2xl font-bold text-center text-slate-100 mb-6">
                Reclutar Jugador
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="idJugador"
                        className="block text-sm font-semibold text-slate-300 md:text-base"
                    >
                        Id del Jugador
                    </label>
                    <input
                        type="text"
                        id="idJugador"
                        placeholder="Ingresa La Id del Jugador"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 text-xl"
                        onChange={(e) => setPlayerId(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-slate-200 font-semibold bg-green-600 rounded-lg transition-all duration-300 hover:-translate-x-1 hover:text-slate-400 hover:bg-green-800 text-xl"
                    >
                        <IoPersonAddOutline className="inline-block mb-1 mr-1" />
                        Reclutar
                    </button>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-slate-800 text-white px-2 py-1 rounded-lg transition-all duration-300 text-lg font-semibold hover:bg-slate-700 hover:-translate-x-1"
                        >
                            ← Volver
                    </button>
                </div>
            </form>
        </div>
    );
};
