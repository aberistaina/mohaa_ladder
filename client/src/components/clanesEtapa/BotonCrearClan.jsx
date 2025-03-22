import { useParams } from "react-router-dom";
import { fetchHook } from "../../hooks/fetchHook";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Iconos
import { GrAddCircle } from "react-icons/gr";

export const BotonCrearClan = () => {
    const [etapa, setEtapa] = useState("");
    const { id } = useParams();
    const url = `http://localhost:3000/api/v1/etapas/${id}`
    const method = "GET";

    useEffect(() => {
        const getEtapa = async () => {
            try {
                const data = await fetchHook(url, method);
                setEtapa(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getEtapa();
    }, [])

    return (
        
        etapa.activo 
        ? (
            etapa.multijugador 
            ? (
                <Link to={`/ladder/crear-clan/${id}`}>
                    <button className="mb-2 p-1 text-base mx-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:text-slate-400 hover:-translate-x-1 hover:bg-green-800 transition-all duration-300 md:p-4 md:text-lg md:mb-10">
                        <GrAddCircle className="inline-block mb-1 mr-1" />
                        Crear Nuevo Clan
                    </button>
                </Link>
            ) : (
                <Link to={`/ladder/crear-clan/${id}`}>
                    <button className="mb-10 px-4 py-4 mx-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                        Ingresar al Ladder
                    </button>
                </Link>
            )
        ) : (
            <h1></h1>
        )
    );
};
