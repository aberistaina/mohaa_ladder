import { useState, useEffect } from 'react'
import { fetchHook } from '../../hooks/fetchHook'
import { TablaJugadores } from './TablaJugadores'

export const ListaJugadores = () => {
    const [ jugadores, setJugadores ] = useState([])

    useEffect(() => {
        const getJugadores = async() =>{
            try {
                const url = "http://localhost:3000/api/v1/players/"
                const method = "GET"
                const data = await fetchHook(url, method)
                if(data?.data){
                    setJugadores(data.data)
                }else{
                    setJugadores([])
                }

            } catch (error) {
                console.log(error);
                setJugadores([])
            }
            
        }
            getJugadores();
        }, []);
    
    return (
    <TablaJugadores jugadores={jugadores}/>
    )
}
