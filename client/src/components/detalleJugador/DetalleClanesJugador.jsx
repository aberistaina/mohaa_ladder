import { formatDate } from "../../utils/formatearFecha";
import { Link } from 'react-router-dom';

export const DetalleClanesJugador = ({ player }) => {
    return (
        <>
            {/* Clanes del Jugador */}
            <div>
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
                            </tr>
                        </thead>
                        <tbody className="text-center text-lg font-medium">
                            {player.clanes &&
                                player.clanes.map((clan) => (
                                    <tr
                                        className="text-slate-300 text-lg"
                                        key={clan.id}
                                    >
                                        <td className="px-4 py-2">
                                            <Link
                                                className="text-slate-50 underline hover:text-slate-500 transition-all duration-300"
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
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
