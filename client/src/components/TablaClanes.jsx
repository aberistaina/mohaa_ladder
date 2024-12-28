import { useEffect, useState } from "react";
import { fetchHook } from "../hooks/fetchHook";

export const TablaClanes = () => {
    const [clanes, setClanes] = useState("");

    const url = "http://localhost:3000/api/v1/clanes";
    const method = "GET";

    useEffect(() => {
        const getClanes = async () => {
            const data = await fetchHook(url, method);
            setClanes(data.data);
        };
        getClanes();
    }, []);

    return (
        <>
            <div className="overflow-x-auto flex justify-center p-4">
                <table className="min-w-[80%] table-auto bg-white rounded-lg shadow-md">
                    <thead className="bg-[#F3F3F3] text-black">
                        <tr>
                            <th className="px-4 py-2 text-left">Lugar</th>
                            <th className="px-4 py-2 text-left">Clan</th>
                            <th className="px-4 py-2 text-left">Ganados</th>
                            <th className="px-4 py-2 text-left">Perdidos</th>
                            <th className="px-4 py-2 text-left">Racha</th>
                            <th className="px-4 py-2 text-left">
                                Promedio Victorias
                            </th>
                            <th className="px-4 py-2 text-left">
                                Último Registro
                            </th>
                            <th className="px-4 py-2 text-left">Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clanes &&
                            clanes.map((clan) => (
                                <tr
                                    className="hover:bg-[#7C8C98] text-black"
                                    key={clan.id}
                                >
                                    <td className="px-4 py-2">
                                    {clan.ranking_actual === 1
                                        ? "🏆 " + clan.ranking_actual
                                        : clan.ranking_actual === 2
                                        ? "🥈 " + clan.ranking_actual
                                        : clan.ranking_actual === 3
                                        ? "🥉 " + clan.ranking_actual
                                        : clan.ranking_actual < clan.ultimo_ranking
                                        ? "⬆️ " + clan.ranking_actual
                                        : "⬇️ " + clan.ranking_actual}
                                    </td>
                                    <td className="px-4 py-2 font-semibold text-blue-600">
                                        {clan.nombre}
                                    </td>
                                    <td className="px-4 py-2">
                                        {clan.triunfos}
                                    </td>
                                    <td className="px-4 py-2">
                                        {clan.derrotas}
                                    </td>
                                    <td className="px-4 py-2">
                                        {clan.racha_actual}
                                    </td>
                                    <td className="px-4 py-2">
                                        {clan.juegos === 0
                                            ? 0
                                            : Math.round((clan.triunfos / clan.juegos) * 100) + " %"
                                        }
                                    </td>
                                    <td className="px-4 py-2">
                                        {clan.dias_inactivo}
                                    </td>
                                    <td className="px-4 py-2">{clan.id}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
