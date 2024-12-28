import { useEffect, useState } from "react";
import { obtenerLocalStorage } from "../hooks/localStorage";
import { fetchHook } from "../hooks/fetchHook";
import { formatDate } from '../utils/formatearFecha';

export const MiCuenta = () => {
    const [player, setPlayer] = useState({})

    useEffect(() => {
        const getInfoPlayer = async () => {
            const { playerData } = obtenerLocalStorage()
            const url = `http://localhost:3000/api/v1/players/${playerData.id}`;
            const method = "GET";
            const data = await fetchHook(url, method);
            setPlayer(data.data[0]);
        };
        getInfoPlayer()
    }, []);

    return (
        <>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                {/* Información del Jugador */}
                <div className="flex flex-col md:flex-row mb-8">
                    <div className="w-full md:w-1/3 md:pr-6 mb-6 md:mb-0">
                        {/* Imagen del Jugador */}
                        <img
                            src="https://st3.depositphotos.com/9468312/12912/v/450/depositphotos_129128076-stock-illustration-gray-man-avatar.jpg"
                            alt="Jugador"
                            className="rounded-full w-32 h-32 md:w-full md:h-full object-cover mx-auto"
                        />
                    </div>
                    <div className="w-full md:w-2/3">
                        <h2 className="text-2xl font-semibold mb-4">
                            Información del Jugador
                        </h2>
                        <div className="space-y-2">
                            <p>
                                <strong>ID:</strong> {player.id}
                            </p>
                            <p>
                                <strong>Username:</strong> {player.username}
                            </p>
                            <p>
                            <strong>Fecha de Ingreso:</strong> {player && formatDate(player.created_at)}
                            </p>
                            <p>
                                <strong>ID Volute:</strong> 67890
                            </p>
                            <p>
                                <strong>Email:</strong> {player.email}
                            </p>
                            <p>
                                <strong>Victorias:</strong> {player.victorias}
                            </p>
                            <p>
                                <strong>Derrotas:</strong> {player.derrotas}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Información del Equipo */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">
                        Información del Equipo
                    </h2>
                    <div className="overflow-x-auto bg-gray-50 rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-200 text-left">
                                <tr>
                                    <th className="px-4 py-2">
                                        Nombre del Clan
                                    </th>
                                    <th className="px-4 py-2">Etapa</th>
                                    <th className="px-4 py-2">Rango</th>
                                    <th className="px-4 py-2">
                                        Fecha de Ingreso
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {player.clanes && player.clanes.map((clan) => (
                                    <tr className="border-b" key={clan.id}>
                                        <td className="px-4 py-2">
                                            {clan.nombre}
                                        </td>
                                        <td className="px-4 py-2">
                                            {clan.etapa_nombre}
                                        </td>
                                        <td className="px-4 py-2">
                                            {clan.rango}
                                        </td>
                                        <td className="px-4 py-2">
                                            {clan && formatDate(clan.joined_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};
