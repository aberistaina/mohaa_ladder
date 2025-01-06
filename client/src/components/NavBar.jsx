import { useEffect, useState } from "react";
import { fetchHook } from "../hooks/fetchHook";
import { obtenerLocalStorage } from "../hooks/localStorage";
import { Link } from "react-router-dom";

export const NavBar = () => {
    const [juegos, setJuegos] = useState("");
    const [user, setUser] = useState({});

    const url = "http://localhost:3000/api/v1/juegos";
    const method = "GET";

    useEffect(() => {
        const { playerData } = obtenerLocalStorage();
        setUser(playerData);
        const getJuegos = async () => {
            const data = await fetchHook(url, method);
            setJuegos(data.data);
        };
        getJuegos();
    }, []);
    return (
        <>
            <div className="flex flex-col justify-between  p-4 border border-slate-500 bg-slate-900 rounded">
                <div>
                    <h4 className="cursor-pointer font-bold text-lg text-slate-100 transition-all duration-300 hover:text-slate-500 hover:translate-x-1">
                        <Link to={`/`}>» Home</Link>
                    </h4>
                </div>
                {user && (
                    <div>
                        <h4 className="cursor-pointer font-bold text-lg text-slate-100 transition-all duration-300 hover:text-slate-500 hover:translate-x-1">
                            <Link to={`/micuenta`}>» Mi Cuenta</Link>
                        </h4>
                    </div>
                )}
                {user && (
                    <div>
                        <h4 className="cursor-pointer font-bold text-lg text-slate-100 transition-all duration-300 hover:text-slate-500 hover:translate-x-1">
                            <Link to={`/reportes`}>» Reportar Una Derrota</Link>
                        </h4>
                    </div>
                )}

                <div>
                    <h4 className="font-bold text-lg text-slate-100">
                        » Juegos
                    </h4>
                    {juegos &&
                        juegos.map((juego) => (
                            <div key={juego.id} className="pl-4">
                                <p className="cursor-pointer font-semibold text-gray-400 transition-all duration-300 hover:text-slate-600 hover:translate-x-1">
                                   <Link to={`/juego/${juego.id}`}> {juego.nombre}</Link>
                                </p>
                            </div>
                        ))}
                </div>
                <div>
                    <h4 className="cursor-pointer font-bold text-lg text-slate-100 transition-all duration-300 hover:text-slate-500 hover:translate-x-1">
                        » Datos
                    </h4>
                </div>
            </div>
        </>
    );
};
