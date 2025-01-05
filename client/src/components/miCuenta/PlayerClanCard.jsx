import { formatDate } from "../../utils/formatearFecha";

export const PlayerClanCard = ({ player }) => {
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
                                            {clan.nombre}
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
                                        {clan &&
                                            (clan.PlayerClan.rango ===
                                                "Lider" ||
                                                clan.PlayerClan.rango ===
                                                    "Co-Lider") && (
                                                <td className="px-4 py-2">
                                                    {clan.PlayerClan.rango ===
                                                    "Lider" ? (
                                                        <div className="flex justify-center">
                                                            <button className="px-4 py-0 mx-2  bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-950 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                                                                Editar
                                                            </button>
                                                            <button className="px-2 py-0 mx-2  bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                                                                Eliminar
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex justify-center">
                                                            <button className="px-4 py-0 mx-2  bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                                                                Editar
                                                            </button>
                                                        </div>
                                                    )}
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
