import { useEffect, useState } from "react";
import { fetchHook } from "../../hooks/fetchHook";
import { useParams } from 'react-router-dom'
import { TablaClanes } from './TablaClanes'
import { BotonCrearClan} from "./BotonCrearClan"

export const ClanesEtapa = () => {

    const [clanes, setClanes] = useState("");
    const { id } = useParams();

    const url = `http://localhost:3000/api/v1/clanes/etapa/${id}`
    const method = "GET";

    useEffect(() => {
        const getClanes = async () => {
            const data = await fetchHook(url, method);
            setClanes(data.data);
        };
        getClanes();
    }, [id])

    return (
        <>
            <div>
                <BotonCrearClan />
                <TablaClanes clanes= {clanes}/>
            </div>
        </>
    )
}
