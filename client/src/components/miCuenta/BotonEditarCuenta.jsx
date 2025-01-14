import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";

export const BotonEditarCuenta = () => {
    const { player } = useContext(LoginContext);
    return (
        <div className="flex justify-end">
            <Link to={`/editar-micuenta/${player.id}`}>
                <button className="px-2 py-1 mx-2  bg-cyan-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                Editar Mi Cuenta
                </button>
            </Link>
        </div>
    );
};
