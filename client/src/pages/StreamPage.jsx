import { useEffect, useState } from "react";
import { StreamCard } from "../components/StreamCard";
import { OfflineStreamerCard } from "../components/OflineStreamCard.jsx";

export const StreamPage = () => {
    const [onlineStreamers, setOnlineStreamers] = useState([]);
    const [oflineStreamers, setOflineStreamers] = useState([]);

    useEffect(() => {
        const fetchStreams = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/v1/stream");
                const data = await res.json();
                setOflineStreamers(data.data.ofline);
                setOnlineStreamers(data.data.online);
            } catch (error) {
                console.error("Error al obtener los streams:", error);
            }
        };

        fetchStreams();
    }, []);

    return (
        <>
            <div className="bg-[#0e0e10] min-h-screen">
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4 text-slate-100">Streams en vivo</h1>

                    {onlineStreamers.length === 0 ? (
                        <p className="text-slate-100">No hay streams activos en este momento.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {onlineStreamers.map((stream) => (
                                <StreamCard key={stream.id} stream={stream} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4 text-slate-100">Streams Offline</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {oflineStreamers.map((streamer) => (
                            <OfflineStreamerCard
                                key={streamer}
                                username={streamer}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
