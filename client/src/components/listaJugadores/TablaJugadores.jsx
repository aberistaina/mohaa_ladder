import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatearFecha";
import { BsTwitch } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa6";

export const TablaJugadores = ({ jugadores }) => {
    return (
        <>
            <div className="overflow-x-auto flex justify-center rounded border border-slate-500">
                <table className="min-w-[80%] table-auto bg-slate-900 rounded-lg shadow-md">
                    <thead className="bg-slate-950 border-b border-slate-500">
                        <tr className="text-slate-100 text-xl">
                            <th className="px-4 py-2 text-left font-semibold">
                                ID
                            </th>
                            <th className="px-4 py-2 text-center font-semibold">
                                Username
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                                Ganados
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                                Perdidos
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                                ID Volute
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                                Fecha Registro
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                                Twitch
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                                Youtube
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {jugadores &&
                            jugadores.map((jugador) => (
                                <tr
                                    className="text-slate-300 text-lg transition-all duration-300 hover:bg-slate-800"
                                    key={jugador.id}
                                >
                                    <td className="px-4 py-2 font-semibold text-slate-50 text-center">
                                        {jugador.id}
                                    </td>
                                    <td className="px-4 py-2 font-semibold text-slate-50 text-center hover:text-slate-500 transition-colors duration-500">
                                        <Link
                                            to={`/ladder/detalle-jugador/${jugador.id}`}
                                        >
                                            {jugador.username}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {jugador.victorias}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {jugador.derrotas}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <Link
                                            to={`https://volute.io/users/${jugador.volute}`}
                                        >
                                            {jugador.volute}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {formatDate(jugador.created_at)}
                                    </td>

                                    {
                                        jugador.twitch ?(
                                            <td>
                                                <div className="px-4 py-2 flex justify-center">
                                                    <Link
                                                        to={`https://www.twitch.tv/${jugador.volute}`}
                                                    >
                                                        <BsTwitch className=" text-3xl fill-[#9146FF] hover:fill-[#5315af] transition-colors duration-300" />
                                                    </Link>
                                                </div>
                                            </td>
                                        )
                                        :
                                        (
                                            <td>
                                                <div className="px-4 py-2 flex justify-center">
                                                        <BsTwitch className=" text-3xl"/>
                                                </div>
                                            </td>
                                        )
                                    }

                                    {jugador.youtube ?(
                                        <td>
                                            <div className="px-4 py-2 flex justify-center">
                                                <Link
                                                    to={`https://volute.io/users/${jugador.volute}`}
                                                >
                                                    <FaYoutube className=" text-3xl fill-[#FF0033] hover:fill-[#830821] transition-colors duration-300" />
                                                </Link>
                                            </div>
                                        </td>)
                                        :
                                        (
                                            <td>
                                                <div className="px-4 py-2 flex justify-center">
                                                        <FaYoutube className=" text-3xl"/>
                                                </div>
                                            </td>
                                        )
                                    }

                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
