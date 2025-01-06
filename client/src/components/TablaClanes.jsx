import { useEffect, useState } from "react";
import { fetchHook } from "../hooks/fetchHook";
import { Link } from "react-router-dom";

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
            <div className="overflow-x-auto flex justify-center rounded border border-slate-500">
                <table className="min-w-[80%] table-auto bg-slate-900 rounded-lg shadow-md">
                    <thead className="bg-slate-950 border-b border-slate-500">
                        <tr className="text-slate-100 text-xl">
                            <th className="px-4 py-2 text-left font-semibold">
                                Lugar
                            </th>
                            <th className="px-4 py-2 text-center font-semibold">
                                Clan
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                                Ganados
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                                Perdidos
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                                Racha
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                                Promedio Victorias
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                                Último Registro
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                                Id
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {clanes &&
                            clanes
                                .filter((clan) => clan.ranking_actual !== 0)
                                .map((clan) => (
                                    <tr
                                        className="text-slate-300 text-lg transition-all duration-300 hover:bg-slate-800"
                                        key={clan.id}
                                    >
                                        <td className="px-4 py-2">
                                            {clan.ranking_actual === 1
                                                ? "🏆 " + clan.ranking_actual
                                                : clan.ranking_actual === 2
                                                ? "🥈 " + clan.ranking_actual
                                                : clan.ranking_actual === 3
                                                ? "🥉 " + clan.ranking_actual
                                                : clan.ranking_actual <
                                                clan.ultimo_ranking
                                                ? "⬆️ " + clan.ranking_actual
                                                : "⬇️ " + clan.ranking_actual}
                                        </td>
                                        <td className="px-4 py-2 font-semibold text-slate-50">
                                            <Link to={`/detalle-clan/${clan.id}`}>{clan.nombre}</Link>
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            {clan.triunfos}
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            {clan.derrotas}
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            {clan.racha_actual >= 10
                                                ? "🔥" + clan.racha_actual
                                                : clan.racha_actual <= -10
                                                ? "❄️" + clan.racha_actual
                                                : clan.racha_actual}
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            {clan.juegos === 0
                                                ? 0
                                                : Math.round(
                                                    (clan.triunfos /
                                                        clan.juegos) *
                                                        100
                                                ) + " %"}
                                        </td>
                                        <td className="px-4 py-2">
                                            {clan.ultimo_registro}
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            {clan.id}
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
