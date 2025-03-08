import { formatDate } from "../../utils/formatearFecha";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { Link } from "react-router-dom";
import { fetchHook } from "../../hooks/fetchHook";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


export const PlayerClanCard = ({ player }) => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    /* const { token } = useContext(LoginContext) */
    const token = useSelector((state) => state.auth.token);

    const abandonarClan = async(playerId, clanId, nombreClan) =>{
        try {
            const confirmed = window.confirm(`¿Estás seguro de que quieres abandonar el clan ${nombreClan}?`);
            
            if(confirmed){
                const url = `http://localhost:3000/api/v1/players/dejar-clan?token=${token}`
                const method = "DELETE"
                const body = {
                    playerId,
                    clanId
                }

                const data = await fetchHook(url, method, body);
                if (data.code === 200) {
                    enqueueSnackbar(data.message, { variant: "success" });
                    navigate(`/ladder`);
                }else if(data.code === 400) {
                    enqueueSnackbar(data.message, { variant: "success" });
                } else {
                    enqueueSnackbar(data.message, { variant: "error" });
                }
            }
                        
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {/* Información del Equipo */}
            <div className="Hola">
                <h2 className="text-2xl font-bold mb-4 text-slate-100">
                    Información del Equipo
                </h2>
                <div className="overflow-x-auto bg-gray-50 rounded shadow-md">
                    <table className="min-w-full border border-slate-500 bg-slate-900">
                        <thead className="bg-slate-950 border-b border-slate-500">
                            <tr className="text-slate-100 text-lg">
                                <th className="px-4 py-2">Nombre del Clan</th>
                                <th className="px-4 py-2">Etapa</th>
                                <th className="px-4 py-2">Rango</th>
                                <th className="px-4 py-2">Fecha de Ingreso</th>
                                <th className="px-4 py-2">Abandonar Clan</th>
                                {player.clanes?.some(
                                    (clan) =>
                                        clan.PlayerClan.rango === "Lider" ||
                                        clan.PlayerClan.rango === "Co-Lider"
                                ) && <th className="px-4 py-2">Acciones</th>}
                            </tr>
                        </thead>
                        <tbody className="text-center text-lg font-medium">
                            {player.clanes &&
                                player.clanes.map((clan) => (
                                    <tr
                                        className="text-slate-300 text-lg transition-all duration-300 hover:bg-slate-800"
                                        key={clan.id}
                                    >
                                        <td className="px-4 py-2">
                                            <Link
                                                className="hover:text-blue-500 hover:underline transition duration-300"
                                                to={`/ladder/detalle-clan/${clan.id}`}
                                            >
                                                {clan.nombre}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2">
                                            {clan.etapa.nombre}
                                        </td>
                                        <td className="px-4 py-2">
                                            {clan.PlayerClan.rango}
                                        </td>
                                        <td className="px-4 py-2">
                                            {clan &&
                                                formatDate(
                                                    clan.PlayerClan.joined_at
                                                )}
                                        </td>
                                        <td className="px-4 py-2">
                                        <button className=" px-1 py-1 mx-2   bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300"
                                        onClick={(e) =>{abandonarClan(player.id, clan.id, clan.nombre)}}
                                        >
                                                                Dejar Clan
                                                            </button>
                                        </td>
                                        {clan.PlayerClan.rango &&
                                            (clan.PlayerClan.rango ===
                                                "Lider" ||
                                                clan.PlayerClan.rango ===
                                                    "Co-Lider") && (
                                                <td>
                                                    <div className="flex justify-center items-center">
                                                        <Link to={`/ladder/editar-clan/${clan.id}`}>
                                                            <button   className="px-4 py-0 mx-2  bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-950 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                                                                Editar
                                                            </button>
                                                        </Link>
                                                        <Link to={`/ladder/reclutar/${clan.id}/${clan.etapa.id}`}>
                                                            <button className="px-2 py-0 mx-2  bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                                                                Reclutar
                                                            </button>
                                                            </Link>
                                                    </div>
                                                </td>
                                            )}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
