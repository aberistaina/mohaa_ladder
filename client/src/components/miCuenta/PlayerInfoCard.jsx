import { formatDate } from "../../utils/formatearFecha";

export const PlayerInfoCard = ({ player }) => {
    return (
        <>
            {/* Información del Jugador */}
            <div className="flex flex-col md:flex-row mb-8">
                <div className="w-full md:w-1/3 md:pr-6 mb-6 md:mb-0">
                    {/* Imagen del Jugador */}
                    <img
                        src="https://st3.depositphotos.com/9468312/12912/v/450/depositphotos_129128076-stock-illustration-gray-man-avatar.jpg"
                        alt="Jugador"
                        className="rounded-full w-32 h-32 md:w-full md:h-full object-cover mx-auto"
                    />
                </div>
                <div className="w-full md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4 text-slate-100">
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
                                65874
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Email:</p>
                            <span className="font-normal text-slate-300">
                                {player.email}
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
                    </div>
                </div>
            </div>
        </>
    );
};
