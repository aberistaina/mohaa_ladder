import { useEffect, useState } from "react";
import { fetchHook } from "../../hooks/fetchHook";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

export const FormularioEditarClan = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [clan, setClan] = useState({});
    const { id } = useParams();
    const rangos = ["Lider", "Co-Lider", "Capitán", "Miembro"];

    const [form, setForm] = useState({
        nombre: "",
        tag: "",
        players: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleChangeRango = (e, index) => {
        const { value } = e.target;

        setForm((prevForm) => {
            const updatedPlayers = prevForm.players.map((player, i) => {
                if (i === index) {
                    // eslint-disable-next-line no-unused-vars
                    const { victorias,derrotas,PlayerClan,volute,username,...rest} = player;
                    return {
                        ...rest,
                        rango: value,
                    };
                }
                return player;
            });

            return { ...prevForm, players: updatedPlayers };
        });
    };

    useEffect(() => {
        const getInfoClan = async () => {
            const url = `http://localhost:3000/api/v1/clanes/${id}`;
            const method = "GET";
            const data = await fetchHook(url, method);
            setClan(data.data);
            setForm({
                nombre: data.data.nombre,
                tag: data.data.tag,
                players: data.data.players,
            });
        };
        getInfoClan();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `http://localhost:3000/api/v1/clanes/editar/${id}`;
        const method = "POST";
        const data = await fetchHook(url, method, form);

        if (data.code === 200) {
            enqueueSnackbar(data.message, { variant: "success" });
            setTimeout(function () {
                window.location.href = "/";
            }, 2000);
        } else {
            enqueueSnackbar(data.message, { variant: "error" });
        }
    };

    const expulsarJugador = async(playerId, clanId) =>{
        const url = `http://localhost:3000/api/v1/clanes/eliminar`;
        const method = "DELETE";
        const body = {
            playerId,
            clanId
        }
        const confirmed = window.confirm('¿Estás seguro de que quieres Expulsar a este jugador?');
        if(confirmed){
            const data = await fetchHook(url, method, body);

            if (data.code === 200) {
                enqueueSnackbar(data.message, { variant: "success" });
                
                setTimeout(function () {
                    location.reload();
                }, 2000);
            } else {
                enqueueSnackbar(data.message, { variant: "error" });
            }
        }
        
    }

    return (
        <>
            <form className="space-y-4 w-2/4" onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label
                        htmlFor="nombre"
                        className="block text-sm font-semibold text-slate-300"
                    >
                        Nombre del Clan
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={form.nombre}
                        placeholder="Ingresa el nombre del clan"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label
                        htmlFor="tag"
                        className="block text-sm font-semibold text-slate-300"
                    >
                        Tag del Clan
                    </label>
                    <input
                        type="text"
                        id="tag"
                        name="tag"
                        value={form.tag}
                        placeholder="Ingresa el tag del clan"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-300">
                        Jugadores
                    </label>
                    {clan.players?.map((player, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center"
                        >
                            <p
                                className="me-10 w-36 text-white"
                                data-id={player.id}
                            >
                                {player.username}
                            </p>
                            <select
                                name={`rango-${index}`}
                                id={`rango-${index}`}
                                className="mt-1 w-36 block px-4 py-2 border border-gray-400 rounded-md text-gray-900 bg-white focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={(e) => handleChangeRango(e, index)}
                            >
                                <option value={player.PlayerClan?.rango}>
                                    {player.PlayerClan?.rango}
                                </option>
                                {rangos
                                    .filter(
                                        (rango) =>
                                            player.PlayerClan?.rango !== rango
                                    )
                                    .map((rango, i) => (
                                        <option key={i} value={rango}>
                                            {rango}
                                        </option>
                                    ))}
                            </select>
                            <button 
                                type="button" 
                                className={`px-2 py-2 mx-2 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300 ${
                                    player.PlayerClan?.rango === "Lider"
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                                disabled={player.PlayerClan?.rango === "Lider"}
                                onClick={() => expulsarJugador(player.id, clan.id)}
                            >
                                Expulsar
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 text-slate-200 font-semibold bg-green-800 rounded-lg transition-all duration-300 hover:bg-green-900"
                >
                    Actualizar Clan
                </button>
            </form>
        </>
    );
};
