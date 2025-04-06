import { useEffect, useState } from "react";
import { fetchHook } from "../../hooks/fetchHook";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// Iconos
import { IoMdAdd } from "react-icons/io";

export const EtapasJuegos = () => {
    const { id } = useParams();
    const [etapas, setEtapas] = useState([]);

    useEffect(() => {
        const getEtapas = async () => {
            try {
                const url = `https://mohaax.cl/api/v1/etapas/juego/${id}`;
                const method = "GET";
                const data = await fetchHook(url, method);
                setEtapas(data.data);
            } catch (error) {
                console.log(error);
            }
        };

        getEtapas();
    }, [id]);
    return (
        <div className="w-80 mr-5 mb-6 p-2 border border-slate-500 bg-slate-900 rounded shadow-md md:w-full md:mb-0 md:mr-0 lg:max-w-4xl lg:mx-auto lg:p-10">
            <div>
                <h2 className="text-lg font-bold mb-4 mt-4 text-slate-100 md:text-2xl">
                    Etapas: {etapas[0]?.juego}
                </h2>
                <div className="overflow-x-auto bg-gray-50 rounded shadow-md">
                    <table className="min-w-full border border-slate-500 bg-slate-900">
                        <thead className="bg-slate-950 border-b border-slate-500">
                            <tr className="text-slate-100 text-lg">
                                <th className="px-10 py-4">Nombre</th>
                                <th className="px-10 py-4">Juego</th>
                                <th className="px-10 py-4">Ver Etapa</th>
                            </tr>
                        </thead>
                        <tbody className="text-center font-medium text-lg">
                            {etapas &&
                                etapas.map((etapa) => (
                                    <tr
                                        className="text-slate-300 text-lg"
                                        key={etapa.id}
                                    >
                                        <td className="px-10 py-4">
                                            {etapa.nombre}
                                        </td>
                                        <td className="px-10 py-4">
                                            {etapa.juego}
                                        </td>
                                        <td className="px-10 py-4">
                                            <Link to={`/ladder/etapa/${etapa.id}`}>
                                                <button className="px-3 py-0 mx-2  bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-800 transition-all duration-300 hover:text-slate-400 hover:-translate-x-1">
                                                    <IoMdAdd className="inline-block mb-1 mr-1" />
                                                    Ver Más
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
