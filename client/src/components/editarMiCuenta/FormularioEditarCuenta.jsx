import { useEffect, useState, useContext } from "react";
import { fetchHook } from "../../hooks/fetchHook";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { useSelector } from 'react-redux';

// Iconos
import { MdOutlineBrowserUpdated } from "react-icons/md";

export const FormularioEditarCuenta = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    /* const { token } = useContext(LoginContext) */
    const player = useSelector((state) => state.auth.player);
    const token = useSelector((state) => state.auth.token);
    const { id } = useParams();
    const [form, setForm] = useState({
        username: "",
        imagen: "",
        volute: "",
        twitch: "",
        youtube: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const getInfoPlayer = async () => {
        try {
            const url = `http://localhost:3000/api/v1/players/${id}`;
            const method = "GET";
            const data = await fetchHook(url, method);
            setForm({
                username: data.data.username,
                imagen: data.data.imagen,
                volute: data.data.volute,
                twitch: data.data.twitch,
                youtube: data.data.youtube
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const url = `http://localhost:3000/api/v1/players/editar/${id}?token=${token}`;
            const method = "PUT";
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

    useEffect(() => {
        getInfoPlayer();
    }, []);

    return (
        <>
            <form className="space-y-4 w-auto mr-14 mb-10 md:mb-0 md:mr-0 md:w-2/4 md:mt-2" onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label
                        htmlFor="nombre"
                        className="block text-sm font-semibold text-slate-300"
                    >
                        Nombre de Usuario
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={form.username}
                        placeholder="Ingresa tu nombre de usuario"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 text-xl"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label
                        htmlFor="volute"
                        className="block text-sm font-semibold text-slate-300"
                    >
                        ID Volute
                    </label>
                    <input
                        type="text"
                        id="volute"
                        name="volute"
                        value={form.volute}
                        placeholder="Ingresa tu nombre de usuario"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 text-xl"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label
                        htmlFor="imagen"
                        className="block text-sm font-semibold text-slate-300"
                    >
                        Imagen De Perfil
                    </label>
                    <input
                        type="text"
                        id="imagen"
                        name="imagen"
                        value={form.imagen}
                        placeholder="Ingresa tu imagen de perfil"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 text-xl"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label
                        htmlFor="twitch"
                        className="block text-sm font-semibold text-slate-300"
                    >
                        Link Twitch
                    </label>
                    <input
                        type="text"
                        id="twitch"
                        name="twitch"
                        value={form.twitch}
                        placeholder="Ingresa tu usuario de twitch"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 text-xl"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label
                        htmlFor="youtube"
                        className="block text-sm font-semibold text-slate-300"
                    >
                        Link Youtube
                    </label>
                    <input
                        type="text"
                        id="youtube"
                        name="youtube"
                        value={form.youtube}
                        placeholder="Ingresa tu usuario de youtube"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 text-xl"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex justify-center">
                    <button className="px-2 py-1 mx-2 text-xl bg-blue-700 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-all duration-300 hover:-translate-x-1 hover:text-slate-500">
                    <MdOutlineBrowserUpdated className="inline-block mb-1 mr-1" />
                    Actualizar Mi Cuenta
                    </button>
                </div>
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
