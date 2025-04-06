import { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { fetchHook } from "../../hooks/fetchHook";
import { PlayerInfoCard } from "./PlayerInfoCard";
import { PlayerClanCard } from "./PlayerClanCard";
import { PlayerInvitacionCard } from "./PlayerInvitacionCard";
import { BotonEditarCuenta } from "./BotonEditarCuenta";
import { useSelector } from 'react-redux';

export const MiCuenta = () => {
    
    const [ userData , userSetData ] = useState({})
    const playerData = useSelector((state) => state.auth.player);
    const player = playerData?.data
    const token = useSelector((state) => state.auth.token);


    useEffect(() => {
        if (player && player.id) {
            const id = player.id;
            const getInfoPlayer = async () => {
                try {
                    const url = `https://mohaax.cl/api/v1/players/${id}`;
                    const method = "GET";
                    const data = await fetchHook(url, method);
                    userSetData(data.data);
                } catch (error) {
                    console.log(error);
                }
            };
            getInfoPlayer();
        }
    }, [player]);
    
    if (!player) {
        return <div>Loading...</div>; 
    }

    return (
        <>
            <div className="w-80 mr-3 mb-10 p-6 border border-slate-500 bg-slate-900 rounded shadow-md md:w-full md:max-w-5xl md:mx-auto md:mb-0 md:mt-2">
                <PlayerInfoCard player={userData} />
                <BotonEditarCuenta />
                <PlayerClanCard player={userData} />
                <PlayerInvitacionCard player={userData} />
            </div>
        </>
    );
};
