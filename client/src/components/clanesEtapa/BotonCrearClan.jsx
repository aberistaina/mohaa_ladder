import { useParams } from "react-router-dom";
import { fetchHook } from "../../hooks/fetchHook";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
                <Link to={`/crear-clan/${id}`}>
                    <button className="mb-10 px-4 py-4 mx-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                        Crear Nuevo Clan
                    </button>
                </Link>
            ) : (
                <Link to={`/crear-clan/${id}`}>
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
