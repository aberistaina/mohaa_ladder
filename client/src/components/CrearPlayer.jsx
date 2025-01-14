import { useState } from "react";
import { useSnackbar } from "notistack";
import { validarEmail } from "../utils/validatiors";
import { fetchHook } from "../hooks/fetchHook";
import { useNavigate } from "react-router-dom";


export const CrearPlayer = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [volute, setVolute] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState({
        username: false,
        email: false,
        password: false,
    });

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const newError = {
                email: !validarEmail(email),
                password: password !== repeatPassword,
                username: username.length === 0,
            };
            setError(newError);
            if (newError.email || newError.password || newError.username) {
                return;
            } else {
                const url = "http://localhost:3000/api/v1/players";
                const method = "POST";
                const body = {
                    username,
                    email,
                    password,
                    volute
                };
                const data = await fetchHook(url, method, body);

                if (data.code === 201) {
                    enqueueSnackbar(data.message, { variant: "success" });
                    setTimeout(function () {
                        navigate("/");
                    }, 1000);
                }else{
                    enqueueSnackbar(data.message, { variant: "error" });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="w-full max-w-md p-6 border border-slate-500 rounded">
                {/* Título */}
                <h2 className="text-2xl font-bold text-center text-slate-100 mb-6">
                    Registro
                </h2>

                {/* Formulario */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Nombre de Usuario */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-semibold text-slate-300"
                        >
                            Nombre de Usuario
                        </label>
                        <input
                            type="username"
                            id="username"
                            placeholder="Ingresa tu nombre de usuario"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {error.username && (
                            <span className="text-red-500">
                                Nombre de usuario es obligatorio
                            </span>
                        )}
                    </div>

                    {/* Email */}
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
                        {error.email && (
                            <span className="text-red-500">
                                Correo no válido
                            </span>
                        )}
                    </div>

                    {/* Volute */}
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
                            placeholder="Ingresa tu ID Volute"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                            onChange={(e) => setVolute(e.target.value)}
                        />
                        
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-slate-300"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Ingresa tu contraseña"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Repite Contraseña */}
                    <div>
                        <label
                            htmlFor="repeatPassword"
                            className="block text-sm font-semibold text-slate-300"
                        >
                            Repite tu Contraseña
                        </label>
                        <input
                            type="repeatPassword"
                            id="repeatPassword"
                            placeholder="Ingresa tu contraseña"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                        {password !== repeatPassword && (
                            <span className="text-red-500">
                                Las contraseñas no coinciden
                            </span>
                        )}
                    </div>

                    {/* Botón de iniciar sesión */}
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-slate-200 font-semibold bg-indigo-800 rounded-lg transition-all duration-300 hover:bg-indigo-900"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
