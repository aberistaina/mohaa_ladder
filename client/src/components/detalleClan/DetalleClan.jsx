import { useEffect, useState } from "react";
import { fetchHook } from "../../hooks/fetchHook";
import { useParams } from 'react-router-dom'
import { DetalleClanCard } from "./DetalleClanCard";
import { JugadoresClan } from "./JugadoresClan";


export const DetalleClan = () => {

    const { id } = useParams();
    const [clan, setClan] = useState({});
    
        useEffect(() => {
            const getInfoClan = async () => {
                const url = `http://localhost:3000/api/v1/clanes/${id}`;
                const method = "GET";
                const data = await fetchHook(url, method);
                setClan(data.data);
            };
            getInfoClan();
        }, [id]);
    
    return (
            <>
                <div className="max-w-4xl mx-auto p-6 border border-slate-500 bg-slate-900 rounded shadow-md">
                    <DetalleClanCard clan={clan} />
                    <JugadoresClan clan={clan} />
                </div>
            </>
        )
}
