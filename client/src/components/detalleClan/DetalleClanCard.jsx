import { formatDate } from "../../utils/formatearFecha";

export const DetalleClanCard = ({ clan }) => {
    return (
        <>
            {/* Información del Jugador */}
            <div className="flex flex-col md:flex-row mb-8">
                <div className="w-full md:w-1/3 md:pr-6 mb-6 md:mb-0">
                    {/* Imagen del Jugador */}
                    <img
                        src={clan.imagen}
                        alt="imagenClan"
                        className="rounded-full w-32 h-32 md:w-full md:h-full object-cover mx-auto"
                    />
                </div>
                <div className="w-full md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4 text-slate-100">
                        Información del Clan
                    </h2>
                    <div className="space-y-2 text-slate-100 text-base md:text-lg">
                        <div className="flex justify-between">
                            <p className="font-semibold">ID:</p>
                            <span className="font-normal text-slate-300">
                                {clan.id}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Nombre:</p>
                            <span className="font-normal text-slate-300">
                                {clan.nombre}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <p className="font-semibold">Tag:</p>
                            <span className="font-normal text-slate-300">
                                {clan.tag}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <p className="font-semibold">Juego:</p>
                            <span className="font-normal text-slate-300">
                            {clan.etapa?.juego.nombre}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Etapa:</p>
                            <span className="font-normal text-slate-300">
                            {clan.etapa?.nombre}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Fecha Creación:</p>
                            <span className="font-normal text-slate-300">
                                {formatDate(clan.created_at).fechaFormateada}
                            </span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
};
