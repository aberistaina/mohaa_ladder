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
            <div className="max-w-4xl mx-auto p-6 border border-slate-500 bg-slate-900 rounded shadow-md">
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
                        <h2 className="text-2xl font-bold mb-4 text-slate-100">
                            Información del Jugador
                        </h2>
                        <div className="space-y-2 text-slate-100 text-lg">
                            <div className="flex justify-between">
                                <p className="font-semibold">ID:</p>  
                                <span className="font-normal text-slate-300">{player.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold">Username:</p>  
                                <span className="font-normal text-slate-300">{player.username}</span>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold">Fecha de Ingreso:</p>  
                                <span className="font-normal text-slate-300">{player && formatDate(player.created_at)}</span>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold">ID Volute:</p>  
                                <span className="font-normal text-slate-300">65874</span>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold">Email:</p>  
                                <span className="font-normal text-slate-300">{player.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold">Victorias:</p>  
                                <span className="font-normal text-slate-300">{player.victorias}</span>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold">Derrotas:</p>  
                                <span className="font-normal text-slate-300">{player.derrotas}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Información del Equipo */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-slate-100">
                        Información del Equipo
                    </h2>
                    <div className="overflow-x-auto bg-gray-50 rounded shadow-md">
                        <table className="min-w-full border border-slate-500 bg-slate-900">
                            <thead className="bg-slate-950 border-b border-slate-500">
                                <tr className="text-slate-100 text-lg">
                                    <th className="px-4 py-2">
                                        Nombre del Clan
                                    </th>
                                    <th className="px-4 py-2">Etapa</th>
                                    <th className="px-4 py-2">Rango</th>
                                    <th className="px-4 py-2">
                                        Fecha de Ingreso
                                    </th>
                                    {player.clanes?.some(
                                        (clan) =>
                                            clan.rango === "Lider" || clan.rango === "Co-Lider"
                                    ) && <th className="px-4 py-2">Acciones</th>}
                                </tr>
                            </thead>
                            <tbody className="text-center text-lg font-medium">
                            {player.clanes && player.clanes.map((clan) => (
                                    <tr className="text-slate-300 text-lg transition-all duration-300 hover:bg-slate-800" key={clan.id}>
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
                                        {(clan && (clan.rango === "Lider" || clan.rango === "Co-Lider")) && (
                                            <td className="px-4 py-2">
                                                {clan.rango === "Lider" 
                                                ?
                                                (<div className="flex justify-center">
                                                    <button className="px-4 py-0 mx-2  bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-950 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">Editar</button>
                                                    <button className="px-2 py-0 mx-2  bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">Eliminar</button>
                                                    
                                                </div>)
                                                :
                                                (<div className="flex justify-center">
                                                    <button className="px-4 py-0 mx-2  bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">Editar</button>
                                                </div>)
                                                }
                                            </td>
                                        )}

                
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
