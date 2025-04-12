import { getColorForUsername } from "../utils/colorTwitchPallete";

export const OfflineStreamerCard = ({ username }) => {

    const color = getColorForUsername(username);
    
    return (
        <div className="relative group rounded-md overflow-hidden shadow hover:cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:translate-x-1">
            
            <div className="relative aspect-video rounded mb-2 overflow-hidden">
            <iframe
                src={`https://player.twitch.tv/?channel=${username}&parent=localhost`}
                height="300"
                width="100%"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                title={`Canal de ${username}`}
            >
            </iframe>
            </div>

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
