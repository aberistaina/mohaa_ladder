import { useEffect, useState } from "react";
import { StreamCard } from "../components/StreamCard";

export const StreamPage = () => {
    const [streams, setStreams] = useState([]);

    useEffect(() => {
        const fetchStreams = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/v1/stream");
                const data = await res.json();
                setStreams(data.data);
                console.log(data);
            } catch (error) {
                console.error("Error al obtener los streams:", error);
            }
        };
    
        fetchStreams();
    }, []);
    

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Streams en vivo</h1>

            {streams.length === 0 ? (
                <p>No hay streams activos en este momento.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {streams.map((stream) => (
                        <StreamCard key={stream.id} stream={stream} />
                    ))}
                </div>
            )}
        </div>
    );
};
