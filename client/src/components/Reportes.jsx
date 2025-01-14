import { useState, useEffect } from "react";
import { fetchHook } from "../hooks/fetchHook";
import { obtenerLocalStorage } from "../hooks/localStorage";
import {useSnackbar} from 'notistack';
import { useNavigate } from "react-router-dom";

export const Reportes = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [etapas, setEtapas] = useState([]);
    const [juegos, setJuegos] = useState([]);
    const [clanes, setClanes] = useState([]);
    const [idEtapa, setidEtapa] = useState("");
    const [idJuego, setidJuego] = useState("");
    const [idClanGanador, setIdClanGanador] = useState("");
    const [clanPerdedor, setClanPerdedor] = useState({});
    const [comentario, setComentario] = useState("");
    const navigate = useNavigate()

    const getEtapas = async (id) => { 
        try {
            const url = `http://localhost:3000/api/v1/etapas/juego/${id}`;
            const method = "GET";
            const data = await fetchHook(url, method);
            setidJuego(id);
            setEtapas(data.data);
        } catch (error) {
            console.log(error);
        }
        
    };

    const getClanes = async (idEtapa, idClanPerdedor) => { 
        try {
            const url = `http://localhost:3000/api/v1/clanes/obtenerCLanReporte/${idEtapa}/${idClanPerdedor}`;
            const method = "GET";
            const data = await fetchHook(url, method);

            if (data.code === 200) {
                setClanes(data.data);
            }else{
                enqueueSnackbar(data.message, { variant: "error" });
            }
        } catch (error) {
            console.log(error);
        }  
    };

    const getClanPerdedor = async (idEtapa) => { 
        try {
            setidEtapa(idEtapa);
            const { playerData } = obtenerLocalStorage()
            const idJugador = playerData.id;
            const url = `http://localhost:3000/api/v1/players/obtenerCLanEtapa/${idJugador}/${idEtapa}`;
            const method = "GET";
            const data = await fetchHook(url, method);

            if (data.code === 200) {
                setClanPerdedor(data.data);
                const idClanPerdedor = data.data.clanes;
                const rango = data.data.rango;
                getClanes(idEtapa, idClanPerdedor, rango);
            }else{
                enqueueSnackbar(data.message, { variant: "error" });
            }
        } catch (error) {
            console.log(error);
        }

        
    };

    useEffect(() => {
        
        const getJuegos = async () => {
            try {
                const url = `http://localhost:3000/api/v1/juegos`;
                const method = "GET";
                const data = await fetchHook(url, method);
                setJuegos(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getJuegos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            getClanPerdedor(idEtapa);

            const url = `http://localhost:3000/api/v1/ladder`;
            const method = "POST";
            const body = {
                id_clan_ganador: idClanGanador,
                id_clan_perdedor: clanPerdedor.clanes,
                id_etapa: idEtapa,
                id_juego: idJuego,
                comentario: comentario,
                rango: clanPerdedor.rango
            };

            const data = await fetchHook(url, method, body);
            if (data.code === 200) {
                enqueueSnackbar(data.message, { variant: "success" });
                navigate(`/etapa/${idEtapa}`)
            }else{
                enqueueSnackbar(data.message, { variant: "error" });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="flex justify-center h-screen">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-8">
                        Reportes
                    </h1>

                    <form className="space-y-6 bg-[#182134] p-8 rounded-lg shadow-lg max-w-lg mx-auto" onSubmit={handleSubmit}>
                    <div>
                            <label
                                htmlFor="juegos"
                                className="block text-lg font-semibold text-white mb-2"
                            >
                                Juego
                            </label>
                            <select
                                name="juegos"
                                id="juegos"
                                className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md text-gray-900 bg-white focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={(e) => getEtapas(e.target.value)}
                            >
                                <option value="" >Seleccione un juego</option>
                                {juegos.map((juego) => (
                                    <option key={juego.id} value={juego.id} >
                                        {juego.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="etapa"
                                className="block text-lg font-semibold text-white mb-2"
                            >
                                Etapas
                            </label>
                            <select
                                name="etapa"
                                id="etapa"
                                className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md text-gray-900 bg-white focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={(e) => getClanPerdedor(e.target.value)}
                            >
                                <option value="" >Seleccione una Etapa</option>
                                {etapas.map((etapa) => (
                                    <option key={etapa.id} value={etapa.id}>
                                        {etapa.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="id_clan_ganador"
                                className="block text-lg font-semibold text-white mb-2"
                            >
                                Id Clan Ganador
                            </label>
                            <select
                                name="id_clan_ganador"
                                id="id_clan_ganador"
                                className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md text-gray-900 bg-white focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={(e) => setIdClanGanador(e.target.value)}>
                                <option value="">Seleccione un clan</option>
                                {clanes.map((clan) => (
                                    <option key={clan.id} value={clan.id}>
                                        {clan.nombre}
                                    </option>
                                ))}
                            </select>
                            
                        </div>

                        <div>
                            <label
                                htmlFor="comentario"
                                className="block text-lg font-semibold text-white mb-2"
                            >
                                Comentario
                            </label>
                            <textarea
                                type="text"
                                name="comentario"
                                id="comentario"
                                className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md text-gray-900 bg-white focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={(e) => setComentario(e.target.value)}
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
