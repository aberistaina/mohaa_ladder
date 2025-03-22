import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatearFecha";

// Iconos
import { BsTwitch } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

export const TablaJugadores = ({ jugadores }) => {
    const [buscarJugador, setBuscarJugador] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const jugadoresPorPagina = 15;

    const handleBuscarJugador = (e) => {
        setBuscarJugador(e.target.value);
        setPaginaActual(1);
    };

    const jugadoresFiltrados = jugadores.filter((jugador) => 
        jugador.username.toLowerCase().includes(buscarJugador.toLowerCase())
    );

    const jugadoresPaginados = jugadoresFiltrados.slice(
        (paginaActual - 1) * jugadoresPorPagina,
        paginaActual * jugadoresPorPagina
    );

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    const totalPaginas = Math.ceil(jugadoresFiltrados.length / jugadoresPorPagina);

    return (
        <div className="flex flex-col items-center justify-center mt-2 gap-y-2">
            <section className="flex items-center justify-center gap-x-2">
                <FaSearch className="fill-slate-200" />
                <input 
                    type="text" 
                    placeholder="Buscar jugador..." 
                    value={buscarJugador} 
                    onChange={handleBuscarJugador}  
                    className="w-full px-3 py-2 text-lg text-white bg-gray-900 border-2 border-gray-700 rounded-xl shadow-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 transition-all placeholder-gray-400" 
                />
            </section>
            
            {/* Tabla de jugadores */}
            <div className="overflow-x-auto w-80 mr-3 mb-10 rounded border border-slate-500 md:w-auto md:md:mb-0 md:mt-1">
                <table className="min-w-[80%] table-auto bg-slate-900 rounded-lg shadow-md">
                    <thead className="bg-slate-950 border-b border-slate-500">
                        <tr className="text-slate-100 text-xl">
                            <th className="px-4 py-2 text-left font-semibold">ID</th>
                            <th className="px-4 py-2 text-center font-semibold">Username</th>
                            <th className="px-4 py-2 text-left font-semibold">Victorias</th>
                            <th className="px-4 py-2 text-left font-semibold">Derrotas</th>
                            <th className="px-4 py-2 text-left font-semibold">ID Volute</th>
                            <th className="px-4 py-2 text-left font-semibold">Fecha Registro</th>
                            <th className="px-4 py-2 text-left font-semibold">Twitch</th>
                            <th className="px-4 py-2 text-left font-semibold">Youtube</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jugadoresPaginados.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center text-slate-300 py-4">No se encontraron jugadores</td>
                            </tr>
                        ) : (
                            jugadoresPaginados.map((jugador) => (
                                <tr key={jugador.id} className="text-slate-300 text-lg transition-all duration-300 hover:bg-slate-800">
                                    <td className="px-4 py-2 font-semibold text-slate-50 text-center">{jugador.id}</td>
                                    <td className="px-4 py-2 font-semibold text-slate-50 text-center hover:text-slate-500 transition-colors duration-500 underline">
                                        <Link to={`/ladder/detalle-jugador/${jugador.id}`}>{jugador.username}</Link>
                                    </td>
                                    <td className="px-4 py-2 text-center">{jugador.victorias}</td>
                                    <td className="px-4 py-2 text-center">{jugador.derrotas}</td>
                                    <td className="px-4 py-2 text-center">
                                        <Link to={`https://volute.io/users/${jugador.volute}`}>{jugador.volute}</Link>
                                    </td>
                                    <td className="px-4 py-2 text-center">{formatDate(jugador.created_at).fechaFormateada}</td>

                                    {/* Twitch */}
                                    <td className="px-4 py-2">
                                        {jugador.twitch ? (
                                            <div className="flex justify-center">
                                                <Link to={`https://www.twitch.tv/${jugador.twitch}`}>
                                                    <BsTwitch className="text-3xl fill-[#9146FF] hover:fill-[#5315af] transition-all duration-500 hover:scale-125" />
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="flex justify-center">
                                                <BsTwitch className="text-3xl" />
                                            </div>
                                        )}
                                    </td>

                                    {/* Youtube */}
                                    <td className="px-4 py-2">
                                        {jugador.youtube ? (
                                            <div className="flex justify-center">
                                                <Link to={`https://www.youtube.com/${jugador.youtube}`}>
                                                    <FaYoutube className="text-3xl fill-[#FF0033] hover:fill-[#830821] transition-all duration-500 hover:scale-125" />
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="flex justify-center">
                                                <FaYoutube className="text-3xl" />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="flex justify-center items-center gap-x-2 mb-10 -mt-8 md:-mt-0 md:mb-5">
                <button 
                    onClick={() => cambiarPagina(paginaActual - 1)} 
                    disabled={paginaActual === 1} 
                    className="px-2 py-1 text-lg bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-all duration-300 cursor-pointer">
                    <GrPrevious className="inline-block mb-1 mr-1" />
                </button>
                <span className="text-lg text-slate-200">
                    {paginaActual} de {totalPaginas}
                </span>
                <button 
                    onClick={() => cambiarPagina(paginaActual + 1)} 
                    disabled={paginaActual === totalPaginas} 
                    className="px-2 py-1 text-lg bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-all duration-300 cursor-pointer">
                    <GrNext className="inline-block mb-1 mr-1" />
                </button>
            </div>
        </div>
    );
};