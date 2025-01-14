import { useEffect, useState, useContext } from "react";
import { fetchHook } from "../hooks/fetchHook";
import { LoginContext } from "../context/LoginContext";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
    const [juegos, setJuegos] = useState("");
    const { player } = useContext(LoginContext);

    ;

    useEffect(() => {
        const getJuegos = async () => {
            try {
                const url = "http://localhost:3000/api/v1/juegos";
                const method = "GET"
                const data = await fetchHook(url, method);
                setJuegos(data.data);
            } catch (error) {
                console.log(error);
            }
            
        };
        getJuegos();
    }, []);
    return (
        <>
            <div className="flex flex-col justify-between  p-4 border border-slate-500 bg-slate-900 rounded">
                <div>
                    <h4 className="cursor-pointer font-bold text-lg text-slate-100 transition-all duration-300 hover:text-slate-500 hover:translate-x-1">
                        <NavLink to={`/`}>» Home</NavLink>
                    </h4>
                </div>
                {player && (
                    <div>
                        <h4 className="cursor-pointer font-bold text-lg text-slate-100 transition-all duration-300 hover:text-slate-500 hover:translate-x-1">
                            <NavLink to={`/micuenta`}>» Mi Cuenta</NavLink>
                        </h4>
                    </div>
                )}
                {player && (
                    <div>
                        <h4 className="cursor-pointer font-bold text-lg text-slate-100 transition-all duration-300 hover:text-slate-500 hover:translate-x-1">
                            <NavLink to={`/reportes`}>» Reportar Una Derrota</NavLink>
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
                                <NavLink to={`/juego/${juego.id}`}> {juego.nombre}</NavLink>
                                </p>
                            </div>
                        ))}
                </div>
                <div>
                    <h4 className="font-bold text-lg text-slate-100 transition-all duration-300">
                        » Datos
                    </h4>
                        <p className="ps-4 cursor-pointer font-semibold text-gray-400 transition-all duration-300 hover:text-slate-600 hover:translate-x-1">
                                    <NavLink to={"/jugadores"}>Lista De Jugadores</NavLink>
                        </p>
                </div>
            </div>
        </>
    );
};
