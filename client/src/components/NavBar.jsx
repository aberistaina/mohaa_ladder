import { useEffect, useState } from "react";
import { fetchHook } from "../hooks/fetchHook";

export const NavBar = () => {
    const [juegos, setJuegos] = useState("");

    const url = "http://localhost:3000/api/v1/juegos";
    const method = "GET";

    useEffect(() => {
        const getJuegos = async () => {
            const data = await fetchHook(url, method);
            setJuegos(data.data);
        };
        getJuegos();
    }, []);
    return (
        <>
            <div className="flex flex-col items-center justify-between p-4">
                <div>
                    <h4>Principal</h4>
                </div>
                <div>
                    <h4>Manejo De Jugadores</h4>
                </div>
                <div>
                    <h4>Juegos</h4>
                    {juegos &&
                        juegos.map((juego) => (
                            <div key={juego.id}>
                                <p>{juego.nombre}</p>
                            </div>
                        ))}
                </div>
                <div>
                    <h4>Datos</h4>
                </div>
            </div>
        </>
    );
};
