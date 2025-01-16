import { useSearchParams } from "react-router-dom";
import { fetchHook } from "../hooks/fetchHook";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const ValidarCuenta = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [query, setQuery] = useState(false);
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [emailForm, setEmailForm] = useState("");
    const [params] = useSearchParams();

    useEffect(() => {
        if (params.has("token") && params.has("email")) {
            setQuery(true);
            setToken(params.get("token"));
            setEmail(params.get("email"));
        } else {
            setQuery(false);
        }
    }, [params]);

    const validar = async () => {
        try {
            const url = `http://localhost:3000/api/v1/players/validar/${email}?token=${token}`;
            const method = "GET";

            const data = await fetchHook(url, method);

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

    const reenviarValidacion = async (e) => {
        try {
            e.preventDefault();
            const url = `http://localhost:3000/api/v1/players/reenviar-validacion/${emailForm}`;
            const method = "GET";

            const data = await fetchHook(url, method);

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
            <div className="pt-4">
            {query ? (
                <div>
                    <h2 className="text-2xl font-bold text-center text-slate-100 mb-6">Validar Cuenta</h2>
                    <button
                        onClick={validar}
                        className="mb-10 px-4 py-4 mx-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300"
                    >
                        Validar Mi Cuenta
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-md p-6 border border-slate-500 rounded">
                    <h2 className="text-2xl font-bold text-center text-slate-100 mb-6">Validar Cuenta</h2>
                    <form className="space-y-4" onSubmit={reenviarValidacion} >
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
                            onChange={(e) => setEmailForm(e.target.value)}
                        />
                    </div>

                    <button
                        className="mb-10 px-4 py-4 mx-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300"
                    >
                        Reenviar Email De Validación
                    </button>
                    </form>
                </div>
                
            )}
            </div>
        </>
    );
};
