import { formatDate } from "../../utils/formatearFecha";
import { Link } from 'react-router-dom';

export const JugadoresClan = ({ clan }) => {
    return (
        <>
            {/* Lista Jugadores */}
            <div>
                <h2 className="text-2xl font-bold mb-4 mt-4 text-slate-100">
                    Miembros del Clan
                </h2>
                <div className="overflow-x-auto bg-gray-50 rounded shadow-md">
                    <table className="min-w-full border border-slate-500 bg-slate-900">
                        <thead className="bg-slate-950 border-b border-slate-500">
                            <tr className="text-slate-100 text-lg">
                                <th className="px-4 py-2">Nombre</th>
                                <th className="px-4 py-2">Fecha de Ingreso</th>
                                <th className="px-4 py-2">Rango</th>
                                <th className="px-4 py-2">Triunfos</th>
                                <th className="px-4 py-2">Derrotas</th>
                                <th className="px-4 py-2">Volute</th>
                            </tr>
                        </thead>
                        <tbody className="text-center text-lg font-medium">
                            {clan.players &&
                                clan.players.map((player) => (
                                    <tr
                                        className="text-slate-300 text-lg transition-all duration-300 hover:bg-slate-800"
                                        key={player.id}
                                    >
                                        <td className="px-4 py-2 flex justify-center items-center">
                                            <Link className= "hover:text-slate-500 underline transition duration-300" to={`/ladder/detalle-jugador/${player.id}`}>
                                                {clan.tag} {player.username}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2">
                                            {formatDate(player.PlayerClan?.joined_at).fechaFormateada}
                                        </td>
                                        <td className="px-4 py-2">
                                            {player.PlayerClan?.rango}
                                        </td>
                                        <td className="px-4 py-2">
                                            {player.victorias}
                                        </td>
                                        <td className="px-4 py-2">
                                            {player.derrotas}
                                        </td>
                                        <td className="px-4 py-2">
                                            {player.volute}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
