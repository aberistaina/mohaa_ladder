import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { useSelector } from 'react-redux';

// Iconos
import { MdOutlineBrowserUpdated } from "react-icons/md";

export const BotonEditarCuenta = () => {
    /* const { player } = useContext(LoginContext); */
    const playerData = useSelector((state) => state.auth.player);
    const player = playerData?.data

    const token = useSelector((state) => state.auth.token);
    return (
        <div className="flex justify-end mb-10 md:mb-0">
            <Link to={`/ladder/editar-micuenta/${player.id}`}>
                <button className="flex justify-center items-center gap-x-1 px-2 py-1 text-lg bg-blue-700 text-white font-bold rounded-lg shadow-md  transition-all duration-300 hover:text-slate-400 hover:-translate-x-1 hover:bg-blue-900">
                <MdOutlineBrowserUpdated />
                Editar Mi Cuenta
                </button>
            </Link>
        </div>
    );
};
