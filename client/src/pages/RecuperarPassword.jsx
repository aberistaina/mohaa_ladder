import { fetchHook } from "../hooks/fetchHook";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const RecuperarPassword = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:3000/api/v1/players/recuperar-password`;
            const method = "POST";

            const body = {
                email,
            };

            const data = await fetchHook(url, method, body);
            if (data.code === 200) {
                enqueueSnackbar(data.message, { variant: "success" });
                navigate("/ladder");
            } else {
                enqueueSnackbar(data.message, { variant: "error" });
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="w-full max-w-md p-6 border border-slate-500 rounded">
                <h2 className="text-2xl font-bold text-center text-slate-100 mb-6">
                    Validar Cuenta
                </h2>
                <form
                    className="space-y-4 flex justify-center flex-col"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-slate-300"
                        >
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Ingresa tu correo"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button className="mb-10 px-4 py-4 mx-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
                        Recuperar Contraseña
                    </button>
                </form>
            </div>
        </>
    );
};
