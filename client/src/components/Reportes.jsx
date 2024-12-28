import { useState, useEffect } from "react";
import { fetchHook } from "../hooks/fetchHook";

export const Reportes = () => {
    const [etapas, setEtapas] = useState([]);
    const [juegos, setJuegos] = useState([]);
    const [idClanGanador, setIdClanGanador] = useState("");

    useEffect(() => {
        const getEtapas = async () => {
            const url = `http://localhost:3000/api/v1/etapas`;
            const method = "GET";
            const data = await fetchHook(url, method);
            setEtapas(data.data);

        };
        const getJuegos = async () => {
            const url = `http://localhost:3000/api/v1/juegos`;
            const method = "GET";
            const data = await fetchHook(url, method);
            setJuegos(data.data);

        };
        getEtapas();
        getJuegos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        const url = `http://localhost:3000/api/v1/ladder`;
        const method = "POST";
        const body = {
            id_clan_ganador: idClanGanador,
            id_clan_perdedor: 1
        };

        const data = await fetchHook(url, method, body);
        console.log(data);
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
                            >
                                {juegos.map((juego) => (
                                    <option key={juego.id} value={juego.id}>
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
                            >
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
                            <input
                                type="text"
                                name="id_clan_ganador"
                                id="id_clan_ganador"
                                className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md text-gray-900 bg-white focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={(e) => setIdClanGanador(e.target.value)}
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
