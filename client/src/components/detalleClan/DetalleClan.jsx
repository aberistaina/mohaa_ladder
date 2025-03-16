import { useEffect, useState } from "react";
import { fetchHook } from "../../hooks/fetchHook";
import { useParams } from 'react-router-dom'
import { DetalleClanCard } from "./DetalleClanCard";
import { JugadoresClan } from "./JugadoresClan";
import { PartidosJugados } from "./PartidosJugados";


export const DetalleClan = () => {

    const { id } = useParams();
    const [clan, setClan] = useState({});
    const [partidos, setPartidos] = useState([]);
    
        useEffect(() => {
            const getInfoClan = async () => {
                try {
                    const url = `http://localhost:3000/api/v1/clanes/${id}`;
                    const method = "GET";
                    const data = await fetchHook(url, method);
                    setClan(data.data);
                } catch (error) {
                    console.log(error);
                }
            };
            const getInfoPartidos = async () => {
                try {
                    const url = `http://localhost:3000/api/v1/ladder/${id}`;
                    const method = "GET";
                    const data = await fetchHook(url, method);
                    setPartidos(data.data);
                } catch (error) {
                    console.log(error);
                }
            };
            getInfoClan();
            getInfoPartidos()
        }, [id]);
    
    return (
            <>
                <div className="w-80 mr-3 mb-10 p-6 border border-slate-500 bg-slate-900 rounded shadow-md md:w-full md:max-w-4xl md:mx-auto md:mb-0 md:mt-2">
                    <DetalleClanCard clan={clan} />
                    <JugadoresClan clan={clan} />
                    {<PartidosJugados partidos={partidos}/>}
                </div>
            </>
        )
}
