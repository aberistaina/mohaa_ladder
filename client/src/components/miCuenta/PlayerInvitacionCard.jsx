import { formatDate } from "../../utils/formatearFecha";
import { useEffect, useState } from "react";
import { fetchHook } from "../../hooks/fetchHook";

export const PlayerInvitacionCard = ({ player }) => {

    const [invitaciones, setInvitaciones] = useState();

    useEffect(() => {
        const getInvitationsPlayer = async () => {
            const url = `http://localhost:3000/api/v1/invitaciones/${player.id}`;
            const method = "GET";
            const data = await fetchHook(url, method);
            setInvitaciones(data.data);
        };
        getInvitationsPlayer();
        }, [player.id]);
    
    return (
        <>
                        {/* Invitaciones */}
                        <div>
                        <h2 className="text-2xl font-bold mb-4 mt-4 text-slate-100">
                            Invitaciones
                        </h2>
                        <div className="overflow-x-auto bg-gray-50 rounded shadow-md">
                            <table className="min-w-full border border-slate-500 bg-slate-900">
                                <thead className="bg-slate-950 border-b border-slate-500">
                                    <tr className="text-slate-100 text-lg">
                                        <th className="px-4 py-2">
                                            Nombre del Clan
                                        </th>
                                        <th className="px-4 py-2">Etapa</th>
                                        <th className="px-4 py-2">
                                            Fecha de Invitación
                                        </th>
                                        <th className="px-4 py-2">
                                            Acción
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-center text-lg font-medium">
                                {invitaciones &&
                                    invitaciones.map((invitacion) => (
                                        <tr
                                            className="text-slate-300 text-lg transition-all duration-300 hover:bg-slate-800"
                                            key={invitacion.id}
                                        >
                                            <td className="px-4 py-2">{invitacion.clan}</td>
                                            <td className="px-4 py-2">{invitacion.etapa}</td>
                                            <td className="px-4 py-2">{formatDate(invitacion.fecha_envio)}</td>
                                            <td className="px-4 py-2">
                                                        <div className="flex justify-center">
                                                            <button className="px-3 py-0 mx-2  bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-950 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                                                                Aceptar
                                                            </button>
                                                            <button className="px-2 py-0 mx-2  bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                                                                Rechazar
                                                            </button>
                                                        </div>
                                                </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
        </>
    )
}
