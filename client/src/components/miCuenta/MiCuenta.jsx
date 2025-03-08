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
    /* const { player } = useContext(LoginContext); */
    const player = useSelector((state) => state.auth.player);
    const token = useSelector((state) => state.auth.token);


    useEffect(() => {
        if (player && player.id) {
            const id = player.id;
            const getInfoPlayer = async () => {
                try {
                    const url = `http://localhost:3000/api/v1/players/${id}`;
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
            <div className="max-w-4xl mx-auto p-6 border border-slate-500 bg-slate-900 rounded shadow-md">
                <PlayerInfoCard player={userData} />
                <BotonEditarCuenta />
                <PlayerClanCard player={userData} />
                <PlayerInvitacionCard player={userData} />
            </div>
        </>
    );
};
