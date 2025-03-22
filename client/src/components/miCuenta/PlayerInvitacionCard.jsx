import { formatDate } from "../../utils/formatearFecha";
import { useEffect, useState, useContext } from "react";
import { fetchHook } from "../../hooks/fetchHook";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { useSelector } from 'react-redux';

export const PlayerInvitacionCard = ({ player }) => {
    const [invitaciones, setInvitaciones] = useState();
    const { enqueueSnackbar } = useSnackbar();
    /* const { token } = useContext(LoginContext) */
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate()

    

    useEffect(() => {   
        const getInvitationsPlayer = async () => {
            try {
                const url = `http://localhost:3000/api/v1/invitaciones/${player.id}?token=${token}`;
                const method = "GET";
                const data = await fetchHook(url, method);
                setInvitaciones(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getInvitationsPlayer();
    }, [player.id]);

    const aceptarInvitacion = async (idPlayer, idEtapa, idClan, invitacionId) => {
        try {
            const body = {
                player_id: idPlayer,
                clan_id: idClan,
                id_etapa: idEtapa,
                id_invitacion: invitacionId,
            };
            const url = `http://localhost:3000/api/v1/invitaciones/aceptar?token=${token}`;
            const method = "POST";
            const data = await fetchHook(url, method, body);
    
            if (data.code === 201) {
                enqueueSnackbar(data.message, { variant: "success" });
                navigate("/ladder")
            } else {
                enqueueSnackbar(data.message, { variant: "error" });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const rechazarInvitacion = async (idInvitacion) => {
        try {
            const body = {
                id_invitacion: idInvitacion,
            };
            const url = `http://localhost:3000/api/v1/invitaciones/rechazar?token=${token}`;
            const method = "POST";
            const data = await fetchHook(url, method, body);
    
            if (data.code === 200) {
                enqueueSnackbar(data.message, { variant: "warning" });
                navigate("/ladder")
            } else {
                enqueueSnackbar(data.message, { variant: "error" });
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                                <th className="px-4 py-2">Nombre del Clan</th>
                                <th className="px-4 py-2">Etapa</th>
                                <th className="px-4 py-2">
                                    Fecha de Invitación
                                </th>
                                <th className="px-4 py-2">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="text-center text-lg font-medium">
                            {invitaciones &&
                                invitaciones
                                    .filter(
                                        (invitacion) =>
                                            invitacion.estado === "pendiente"
                                    )
                                    .map((invitacion) => (
                                        <tr
                                            className="text-slate-300 text-lg transition-all duration-300 hover:bg-slate-800"
                                            key={invitacion.id}
                                        >
                                            <td className="px-4 py-2">
                                                {invitacion.clan}
                                            </td>
                                            <td className="px-4 py-2">
                                                {invitacion.etapa}
                                            </td>
                                            <td className="px-4 py-2">
                                                {formatDate(
                                                    invitacion.fecha_envio
                                                ).fechaFormateada}
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() =>
                                                            aceptarInvitacion(
                                                                invitacion.player_id,
                                                                invitacion.id_etapa,
                                                                invitacion.clan_id,
                                                                invitacion.id
                                                            )
                                                        }
                                                        className="px-3 py-0 mx-2  bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-950 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300"
                                                    >
                                                        Aceptar
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            rechazarInvitacion(
                                                                invitacion.id
                                                            )
                                                        }
                                                        className="px-2 py-0 mx-2  bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300"
                                                    >
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
    );
};
