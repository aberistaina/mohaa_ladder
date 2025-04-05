import { useEffect, useState, useContext } from "react";
import { fetchHook } from "../hooks/fetchHook";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';

export const NavBar = () => {
    const [juegos, setJuegos] = useState([]);

    const playerData = useSelector((state) => state.auth.player);
    const player = playerData?.data;
    const token = useSelector((state) => state.auth.token);


    const [isMenuOpen, setIsMenuOpen] = useState(false);

    ;

    useEffect(() => {
        const getJuegos = async () => {
            try {
                const url = "http://localhost:3000/api/v1/juegos";
                const method = "GET"
                const data = await fetchHook(url, method);
                if(data?.data){
                    setJuegos(data.data)
                }else{
                    setJuegos([])
                }
            } catch (error) {
                console.log(error);
                setJuegos([]);
            }
            
        };
        getJuegos();
    }, []);
    return (
        <>
            {/* NavBar */}
            <section className="hidden lg:block">
                <div className="flex flex-col justify-between  p-4 border border-slate-500 bg-slate-900 rounded">
                    <div>
                        <h4 className="cursor-pointer font-bold text-lg text-slate-100 transition-all duration-300 hover:text-slate-500 hover:translate-x-1">
                            <NavLink to={`/`}>» Home</NavLink>
                        </h4>
                    </div>
                    {player && (
                        <div>
                            <h4 className="cursor-pointer font-bold text-lg text-slate-100 transition-all duration-300 hover:text-slate-500 hover:translate-x-1">
                                <NavLink to={`/ladder/micuenta`}>» Mi Cuenta</NavLink>
                            </h4>
                            <p className="ps-4 cursor-pointer font-semibold text-gray-400 transition-all duration-300 hover:text-slate-600 hover:translate-x-1">
                                        <NavLink to={`/ladder/modificar-password/${player.email}`}>Modificar mi Contraseña</NavLink>
                            </p>
                        </div>
                    )}
                    {player && (
                        <div>
                            <h4 className="cursor-pointer font-bold text-lg text-slate-100 transition-all duration-300 hover:text-slate-500 hover:translate-x-1">
                                <NavLink to={`/ladder/reportes`}>» Reportar Una Derrota</NavLink>
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
                                    <NavLink to={`/ladder/juego/${juego.id}`}> {juego.nombre}</NavLink>
                                    </p>
                                </div>
                            ))}
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-100 transition-all duration-300">
                            » Datos
                        </h4>
                            <p className="ps-4 cursor-pointer font-semibold text-gray-400 transition-all duration-300 hover:text-slate-600 hover:translate-x-1">
                                        <NavLink to={"/ladder/jugadores"}>Lista De Jugadores</NavLink>
                            </p>
                    </div>
                </div>
            </section>

            {/* NavBar Movile */}
            <section className="md:hidden min-w-max">
                {/* Botón hamburguesa */}
                <button
                    className="text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                {/* Menú movile */}
                <div 
                    className={`${
                        isMenuOpen ? "block" : "hidden"
                    } sticky top-0 bg-slate-900 text-white p-4 z-10`}
                >
                    <div>
                        <h4 className="cursor-pointer font-bold text-lg text-slate-100 transition-all duration-300 hover:text-slate-500 hover:translate-x-1">
                            <NavLink to={`/`}>» Home</NavLink>
                        </h4>
                    </div>
                    {player && (
                        <div>
                            <h4 className="cursor-pointer font-bold text-lg text-slate-100 transition-all duration-300 hover:text-slate-500 hover:translate-x-1">
                                <NavLink to={`/ladder/micuenta`}>» Mi Cuenta</NavLink>
                            </h4>
                            <p className="ps-4 cursor-pointer font-semibold text-gray-400 transition-all duration-300 hover:text-slate-600 hover:translate-x-1">
                                        <NavLink to={`/ladder/modificar-password/${player.email}`}>Modificar mi Contraseña</NavLink>
                            </p>
                        </div>
                    )}
                    {player && (
                        <div>
                            <h4 className="cursor-pointer font-bold text-lg text-slate-100 transition-all duration-300 hover:text-slate-500 hover:translate-x-1">
                                <NavLink to={`/ladder/reportes`}>» Reportar Una Derrota</NavLink>
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
                                    <NavLink to={`/ladder/juego/${juego.id}`}> {juego.nombre}</NavLink>
                                    </p>
                                </div>
                            ))}
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-100 transition-all duration-300">
                            » Datos
                        </h4>
                            <p className="ps-4 cursor-pointer font-semibold text-gray-400 transition-all duration-300 hover:text-slate-600 hover:translate-x-1">
                                        <NavLink to={"/ladder/jugadores"}>Lista De Jugadores</NavLink>
                            </p>
                    </div>
                </div>
            </section>
        </>
    );
};
