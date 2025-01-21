import { formatDate } from "../../utils/formatearFecha";
import { BsTwitch } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const PlayerInfoCard = ({ player }) => {
    return (
        <>
            {/* Información del Jugador */}
            <div className="flex flex-col md:flex-row mb-8">
                <div className="w-full md:w-2/4 md:pr-6 mb-6 md:mb-0">
                    {/* Imagen del Jugador */}
                    <img
                        src={player.imagen}
                        alt="Jugador"
                        className="rounded-xl w-32 h-32 md:w-full md:h-full object-cover mx-auto"
                    />
                </div>

                <div className="w-full md:w-2/4">
                    <h2 className="text-2xl text-center font-bold mb-4 text-slate-100">
                        Información del Jugador
                    </h2>
                    <div className="space-y-2 text-slate-100 text-lg">
                        <div className="flex justify-between">
                            <p className="font-semibold">ID:</p>
                            <span className="font-normal text-slate-300">
                                {player.id}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Username:</p>
                            <span className="font-normal text-slate-300">
                                {player.username}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Fecha de Ingreso:</p>
                            <span className="font-normal text-slate-300">
                                {player && formatDate(player.created_at)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">ID Volute:</p>
                            <span className="font-normal text-slate-300">
                                {player.volute}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Victorias:</p>
                            <span className="font-normal text-slate-300">
                                {player.victorias}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Derrotas:</p>
                            <span className="font-normal text-slate-300">
                                {player.derrotas}
                            </span>
                        </div>

                        <div className="flex justify-between"></div>

                        <div className="flex justify-center items-center">
                            {player.twitch ? (
                                <div>
                                    <Link
                                        to={`${player.twitch}`}
                                        target="_blank"
                                    >
                                        <BsTwitch className=" text-3xl fill-[#9146FF]" />
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <BsTwitch className=" text-4xl" />
                                </div>
                            )}

                            {player.youtube ? (
                                <div className="px-4 py-2">
                                    <Link
                                        to={`${player.youtube}`}
                                        target="_blank"
                                    >
                                        <FaYoutube className=" text-3xl fill-[#FF0033]" />
                                    </Link>
                                </div>
                            ) : (
                                <div className="px-4 py-2">
                                    <FaYoutube className=" text-4xl" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
