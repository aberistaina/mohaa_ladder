import { useContext, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { useParams, useNavigate } from "react-router-dom";
import { fetchHook } from "../../hooks/fetchHook";
import { useSnackbar } from "notistack";

export const CrearClan = () => {
    const { player, token } = useContext(LoginContext);
    const { id } = useParams();

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [formCrearClan, setFormCrearClan] = useState({
        nombre: "",
        tag: "",
        imagen: "",
        id_etapa: id,
        id_lider: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormCrearClan({
            ...formCrearClan,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:3000/api/v1/clanes?token=${token}`;
            const method = "POST";
            formCrearClan.id_lider = player.id
            const body = formCrearClan;
            console.log(token);

            const data = await fetchHook(url, method, body);

            if (data.code === 201) {
                enqueueSnackbar(data.message, { variant: "success" });
                setTimeout(function () {
                    navigate("/ladder/micuenta");
                }, 1000);
            } else {
                enqueueSnackbar(data.message, { variant: "error" });
            }
        } catch (error) {
            console.log("Hubo un error");
        }
    };



    return (
        <>
            <div>
                <h1 className="text-3xl text-center font-bold text-white mb-8">
                    Crear Nuevo Clan
                </h1>
                <form
                    className="space-y-6 bg-[#182134] p-8 rounded-lg shadow-lg max-w-lg mx-auto"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div>
                        <label
                            htmlFor="nombre"
                            className="block text-sm font-semibold text-slate-300"
                        >
                            Nombre Clan
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Ingresa el Nombre"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                            value={formCrearClan.nombre}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="tag"
                            className="block text-sm font-semibold text-slate-300"
                        >
                            Tag Clan
                        </label>
                        <input
                            type="text"
                            name="tag"
                            id="tag"
                            placeholder="Ingresa el tag"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                            value={formCrearClan.tag}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="imagen"
                            className="block text-sm font-semibold text-slate-300"
                        >
                            URL Imagen Clan
                        </label>
                        <input
                            type="text"
                            id="imagen"
                            name="imagen"
                            placeholder="Ingresa el imagen"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                            value={formCrearClan.imagen}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-slate-200 font-semibold bg-blue-700 rounded-lg transition-all duration-300 hover:bg-blue-900"
                        >
                            Crear Clan
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
