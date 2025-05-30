import { useEffect, useState } from "react";
import { fetchHook } from "../../hooks/fetchHook";
import { useParams } from 'react-router-dom'
import { TablaClanes } from './TablaClanes'
import { BotonCrearClan} from "./BotonCrearClan"

export const ClanesEtapa = () => {

    const [clanes, setClanes] = useState("");
    const { id } = useParams();

    const url = `https://mohaax.cl/api/v1/clanes/etapa/${id}`
    const method = "GET";

    useEffect(() => {
        const getClanes = async () => {
            try {
                const data = await fetchHook(url, method);
                setClanes(data.data);
            } catch (error) {
                console.log(error);
            }
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
