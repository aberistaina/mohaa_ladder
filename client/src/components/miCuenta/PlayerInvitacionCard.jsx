import { formatDate } from "../../utils/formatearFecha";

export const PlayerInvitacionCard = ({ player }) => {
    
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
                                </tbody>
                            </table>
                        </div>
                    </div>
        </>
    )
}
