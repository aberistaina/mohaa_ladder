import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { SiStreamlabs } from "react-icons/si";
import { FaDownload, FaGamepad, FaServer } from "react-icons/fa";
import { GiTalk, GiTrophy } from "react-icons/gi";

export const NavBarHome = () => {
    const [menuIcon, setMenuIcon] = useState(false);
    const location = useLocation();
    return (
        <nav className="bg-black/50 shadow px-6 opacity-90">
            <div className="flex h-16 items-center justify-between max-w-7xl mx-auto">
                {/* Mobile menu button */}
                <button
                    className="text-gray-800 hover:text-gray-600 hover:bg-gray-200 rounded p-1 -m-1 transition-colors focus:ring-2 md:hidden"
                    onClick={() => setMenuIcon(!menuIcon)}
                >
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </button>

                {/* Logo */}
                <div className="mx-auto md:mx-0">
                    <Link to="/">
                    <img src="/MOHAAX.png" alt="Logo MOHAA" className="h-16 w-auto" />
                    </Link>
                </div>

                {/* Desktop menu */}
                <div className="hidden md:flex flex-row space-x-8">
                    <div className="flex items-center ">
                        <IoHome className={` hover:text-yellow-400 transition-colors ${
                                location.pathname === "/" ? "fill-red-950 font-bold" : "fill-white"
                            }`} /> 
                        <Link
                            className={`px-3 py-2 hover:text-yellow-400 transition-colors ${
                                location.pathname === "/" ? "text-red-950 font-bold" : "text-white"
                            }`}
                            to="/"
                        >
                            Home
                        </Link>
                    </div>

                    <div className="flex items-center ">
                        <SiStreamlabs className={` hover:text-yellow-400 transition-colors ${
                                location.pathname === "/stream" ? "fill-red-950 font-bold" : "fill-white"
                            }`} /> 
                        <Link
                            className={`px-3 py-2 hover:text-yellow-400 transition-colors ${
                                location.pathname === "/stream" ? "text-red-950 font-bold" : "text-white"
                            }`}
                            to="/stream"
                        >
                            Stream
                        </Link>
                    </div>

                    <div className="flex justify-between items-center ">
                        <FaServer className={` hover:text-yellow-400 transition-colors ${
                                location.pathname === "/servidores" ? "fill-red-950 font-bold" : "fill-white"
                            }`} /> 
                        <Link
                            className={`px-3 py-2 hover:text-yellow-400 transition-colors ${
                                location.pathname === "/servidores" ? "text-red-950 font-bold" : "text-white"
                            }`}
                            to="/servidores"
                        >
                            Servidores
                        </Link>
                    
                    </div>

                    <div className="flex justify-between items-center ">
                        <GiTrophy className={` hover:text-yellow-400 transition-colors ${
                                location.pathname === "/ladder" ? "fill-red-950 font-bold" : "fill-white"
                            }`} /> 
                        <Link
                            className={`px-3 py-2 hover:text-yellow-400 transition-colors ${
                                location.pathname === "/ladder" ? "text-red-950 font-bold" : "text-white"
                            }`}
                            to="/ladder"
                        >
                            Ladder
                        </Link>
                    
                    </div>

                    <div className="flex justify-between items-center ">
                        <GiTalk className={` hover:text-yellow-400 transition-colors ${
                                location.pathname === "/ladder" ? "fill-red-950 font-bold" : "fill-white"
                            }`} /> 
                        <Link
                            className={`px-3 py-2 hover:text-yellow-400 transition-colors ${
                                location.pathname === "/ladder" ? "text-red-950 font-bold" : "text-white"
                            }`}
                            to="/foro"
                        >
                            Foro
                        </Link>
                    
                    </div>

                    <div className="flex justify-between items-center ">
                        <FaDownload className={` hover:text-yellow-400 transition-colors ${
                                location.pathname === "/descargas" ? "fill-red-950 font-bold" : "fill-white"
                            }`} /> 
                        <Link
                            className={`px-3 py-2 hover:text-yellow-400 transition-colors ${
                                location.pathname === "/descargas" ? "text-red-950 font-bold" : "text-white"
                            }`}
                            to="/descargas"
                        >
                            Descargas
                        </Link>
                    
                    </div>

                    <div className="flex justify-between items-center ">
                        <FaGamepad className={` hover:text-yellow-400 transition-colors ${
                                location.pathname === "/volver-a-jugar" ? "fill-red-950 font-bold" : "fill-white"
                            }`} /> 
                        <Link
                            className={`px-3 py-2 hover:text-yellow-400 transition-colors ${
                                location.pathname === "/volver-a-jugar" ? "text-red-950 font-bold" : "text-white"
                            }`}
                            to="/volver-a-jugar"
                        >
                            Guía Para Jugar
                        </Link>
                    
                    </div>

                    

                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`space-y-1 pb-3 pt-2 border-t md:hidden ${menuIcon ? "block" : "hidden"}`}
            >
                <Link
                    className={`block px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors ${
                        location.pathname === "/" ? "bg-blue-500 text-white" : "text-white"
                    }`}
                    to="/"
                >
                    Home
                </Link>
                <Link
                    className={`block px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors ${
                        location.pathname === "/personajes" ? "bg-blue-500 text-white" : "text-white"
                    }`}
                    to="/ladder"
                >
                    Ladder
                </Link>
                <Link
                    className={`block px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors ${
                        location.pathname === "/about" ? "bg-blue-500 text-white" : "text-white"
                    }`}
                    to="/about"
                >
                    About
                </Link>
                <Link
                    className={`block px-3 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors ${
                        location.pathname === "/contacto" ? "bg-blue-500 text-white" : "text-white"
                    }`}
                    to="/contacto"
                >
                    Contacto
                </Link>
            </div>
        </nav>
    );
}
