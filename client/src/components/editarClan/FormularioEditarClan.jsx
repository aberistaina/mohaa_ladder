import { useEffect, useState, useContext } from "react";
import { fetchHook } from "../../hooks/fetchHook";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { useSelector } from 'react-redux';

// Iconos
import { MdOutlineBrowserUpdated } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { CiLogout } from "react-icons/ci";

export const FormularioEditarClan = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    /* const { token, player } = useContext(LoginContext) */
    const player = useSelector((state) => state.auth.player);
    const token = useSelector((state) => state.auth.token);
    const [clan, setClan] = useState({});
    const { id } = useParams();
    const rangos = ["Lider", "Co-Lider", "Capitán", "Miembro"];

    const [form, setForm] = useState({
        nombre: "",
        tag: "",
        imagen:"",
        players: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const eliminarCLan = async() =>{
        try {
            const url = `http://localhost:3000/api/v1/clanes/eliminar/clan?token=${token}`;
            const method = "DELETE";
            const body = { 
                clanId: id, 
                playerId: player.id 
            };
            
            const confirmed = window.confirm('¿Estás seguro de que quieres eliminar el clan, esta acción no se puede revertir?');

            if(confirmed){
                const data = await fetchHook(url, method, body);
                if (data.code === 200) {
                    enqueueSnackbar(data.message, { variant: "success" });
                    navigate("/ladder/micuenta")
                } else {
                    enqueueSnackbar(data.message, { variant: "error" });
                }
            } 
        } catch (error) {
            console.log(error);
        }
    }

    const handleChangeRango = (e, index) => {
        const { value } = e.target;

        setForm((prevForm) => {
            const updatedPlayers = prevForm.players.map((player, i) => {
                if (i === index) {

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

    const getInfoClan = async () => {
        try {
            const url = `http://localhost:3000/api/v1/clanes/${id}`;
            const method = "GET";
            const data = await fetchHook(url, method);
            setClan(data.data);
            setForm({
                nombre: data.data.nombre,
                tag: data.data.tag,
                imagen:data.data.imagen,
                players: data.data.players,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getInfoClan();
    }, []);



    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const url = `http://localhost:3000/api/v1/clanes/editar/${id}?token=${token}`;
            const method = "POST";
            const data = await fetchHook(url, method, form);
    
            if (data.code === 200) {
                enqueueSnackbar(data.message, { variant: "success" });
                navigate("/ladder/micuenta")
            } else {
                enqueueSnackbar(data.message, { variant: "error" });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const expulsarJugador = async(playerId, clanId) =>{
        try {
            const url = `http://localhost:3000/api/v1/clanes/eliminar?token=${token}`;
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
                        navigate(`/ladder/editar-clan/${clanId}`);
                    }, 1000);
                } else {
                    enqueueSnackbar(data.message, { variant: "error" });
                }
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <>
            <form className="space-y-4 w-80 mr-7 mb-10 md:mb-0 md:mr-0 md:w-2/4 md:mt-2" onSubmit={(e) => handleSubmit(e)}>
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
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 text-xl"
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
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 text-xl"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label
                        htmlFor="imagen"
                        className="block text-sm font-semibold text-slate-300"
                    >
                        Logo del Clan
                    </label>
                    <input
                        type="text"
                        id="imagen"
                        name="imagen"
                        value={form.imagen}
                        placeholder="Ingresa el logo del clan"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 text-xl"
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
                                className="me-10 w-36 text-white text-lg md:text-xl"
                                data-id={player.id}
                            >
                                {player.username}
                            </p>
                            <select
                                name={`rango-${index}`}
                                id={`rango-${index}`}
                                className="mt-1 w-36 block px-4 py-2 border border-gray-400 rounded-md text-gray-900 bg-white focus:ring-indigo-500 focus:border-indigo-500 text-base md:text-xl"
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
                                className={`px-2 py-2 mx-2 bg-red-500 text-white font-bold rounded-lg shadow-md hover:-translate-x-1 hover:text-slate-400 hover:bg-red-700 transition-all duration-300 text-lg md:text-xl ${
                                    player.PlayerClan?.rango === "Lider"
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                                disabled={player.PlayerClan?.rango === "Lider"}
                                onClick={() => expulsarJugador(player.id, clan.id)}
                            >
                                <CiLogout className="inline-block mb-1 mr-1" />
                                Expulsar
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 text-slate-200 font-semibold hover:translate-y-1 bg-blue-700 rounded-lg transition-all duration-300 hover:bg-blue-900 hover:text-slate-400 text-xl"
                >
                    <MdOutlineBrowserUpdated className="inline-block mb-1 mr-1" />
                    Actualizar Clan
                </button>

                <button
                    type="button"
                    className="w-full px-4 py-2 text-slate-200 font-semibold bg-red-700 hover:translate-y-1 rounded-lg transition-all duration-300 hover:bg-red-900 hover:text-slate-400 text-xl"
                    onClick={eliminarCLan}
                >
                    <MdDeleteOutline className="inline-block mb-1 mr-1" />
                    Eliminar Clan
                </button>
                <div className="flex justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-slate-800 text-white px-2 py-1 rounded-lg transition-all duration-300 text-lg font-semibold hover:bg-slate-700 hover:-translate-x-1"
                        >
                            ← Volver
                    </button>
                </div>
            </form>
        </>
    );
};