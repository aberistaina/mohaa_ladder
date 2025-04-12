import { getColorForUsername } from "../utils/colorTwitchPallete";
import { useState } from "react";

export const StreamCard = ({ stream }) => {
    const color = getColorForUsername(stream);
    const [hoveringIframe, setHoveringIframe] = useState(false);

    const thumbnail = stream.thumbnail_url
        .replace("{width}", 320)
        .replace("{height}", 180);
    return (
        <div className="relative group rounded-md overflow-hidden shadow hover:cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:translate-x-1">
            <div
                className="relative aspect-video rounded mb-2 overflow-hidden"
                onMouseEnter={() => setHoveringIframe(true)}
                onMouseLeave={() => setHoveringIframe(false)}
            >
                <iframe
                    src={`https://player.twitch.tv/?channel=${stream.user_login}&parent=${window.location.hostname}`}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                />
            </div>
            {!hoveringIframe && (
                <div className="absolute bottom-[80px] left-1 bg-black bg-opacity-70 text-white text-sm px-2 py-0.5 rounded">
                    {stream.viewer_count} espectadores
                </div>
            )}

            {/* Título */}
            <h2 className="text-md font-semibold truncate text-slate-100">
                {stream.title}
            </h2>

            {/* Nombre del streamer */}
            <p className="text-sm text-slate-100 font-bold mt-1">
                {stream.user_name}
            </p>

            {/* Descripción corta */}
            <p className="text-sm text-gray-400">
                {stream.game_name} • {stream.viewer_count} espectadores
            </p>

            <div
                className={`absolute bottom-0 left-0 w-full h-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 ${color}`}
            />
            {/* Borde hover izquierdo */}
            <div
                className={`absolute bottom-0 left-0 w-1.5 h-full opacity-0 group-hover:opacity-100 transition-all duration-300 ${color}`}
            />
        </div>
    );
};
