import { formatDate } from "../../utils/formatearFecha";
import { Link } from 'react-router-dom';

export const PartidosJugados = ({ partidos }) => {
    console.log(partidos);
  return (
    <>
            {/* Lista Jugadores */}
            <div>
                <h2 className="text-2xl font-bold mb-4 mt-4 text-slate-100">
                    Partidos Jugados
                </h2>
                <div className="overflow-x-auto bg-gray-50 rounded shadow-md">
                    <table className="min-w-full border border-slate-500 bg-slate-900">
                        <thead className="bg-slate-950 border-b border-slate-500">
                            <tr className="text-slate-100 text-lg">
                                <th className="px-4 py-2">Clan Ganador</th>
                                <th className="px-4 py-2">Clan Perdedor</th>
                                <th className="px-4 py-2">Comentario</th>
                                <th className="px-4 py-2">Fecha</th>
                            </tr>
                        </thead>
                        <tbody className="text-center text-lg font-medium">
                            {
                                partidos && partidos.map((partido) => (
                                    <tr
                                        className="text-slate-300 text-lg transition-all duration-300 hover:bg-slate-800"
                                        key={partido.id}
                                    >
                                        <td className="px-4 py-2">
                                            <Link className= "hover:text-slate-500 transition duration-300 text-left" to={`/ladder/detalle-clan/${partido.ganador?.id}`}>
                                                {partido.ganador?.nombre} 
                                            </Link>
                                        </td>

                                        <td className="px-4 py-2">
                                            <Link className= "hover:text-slate-500 transition duration-300 text-left" to={`/ladder/detalle-clan/${partido.perdedor?.id}`}>
                                                {partido.perdedor?.nombre} 
                                            </Link>
                                        </td>

                                        <td className="px-4 py-2">
                                            {partido.comentario}
                                        </td>

                                        <td className="px-4 py-2">
                                            {formatDate(partido.fecha).fechaFormateada}
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
