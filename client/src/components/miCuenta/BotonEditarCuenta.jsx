import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { useSelector } from 'react-redux';

export const BotonEditarCuenta = () => {
    /* const { player } = useContext(LoginContext); */
    const player = useSelector((state) => state.auth.player);
    const token = useSelector((state) => state.auth.token);
    return (
        <div className="flex justify-end mb-10 md:mb-0">
            <Link to={`/ladder/editar-micuenta/${player.id}`}>
                <button className="px-2 py-1 mx-2 text-lg bg-blue-700 text-white font-bold rounded-lg shadow-md hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                Editar Mi Cuenta
                </button>
            </Link>
        </div>
    );
};
