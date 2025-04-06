import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

// Iconos
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";

export const Login = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { player, isAuthenticated } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [viewPassword, setViewPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        const url = "https://mohaax.cl/api/v1/login";
        const method = "POST";
        const body = { email, password };

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            if (data.code === 200) {
                dispatch(login(data.token));
                enqueueSnackbar("Sesión iniciada correctamente", {
                    variant: "success",
                });
                navigate("/ladder");
            } else if (data.code === 403) {
                enqueueSnackbar(data.message, { variant: "warning" });
                navigate("/ladder/validar-cuenta");
            } else {
                enqueueSnackbar(data.message, { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar("Error al iniciar sesión", { variant: "error" });
        }
    };

    const loginGoogle = async (token) => {
        console.log(token);
        const url = "https://mohaax.cl/api/v1/login/google";
        const method = "POST";
        const decodedToken = jwtDecode(token);
        const body = {
            token,
            name: decodedToken.name,
            email: decodedToken.email,
        };

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await response.json();

            if (data.code === 200) {
                console.log(data);
                enqueueSnackbar("Sesión iniciada correctamente con Google", {
                    variant: "success",
                });
                dispatch(login(data.token));
                navigate("/ladder");
            } else {
                enqueueSnackbar(data.message, { variant: "error" });
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar("Error al iniciar sesión con Google", {
                variant: "error",
            });
        }
    };

    return (
        <div>
            {isAuthenticated ? (
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold text-center text-slate-100">
                        ¡Bienvenid@!
                    </h1>
                    <h3 className="text-xl font-bold text-center text-slate-300 mb-1">
                        {player.username}
                    </h3>
                    <div className="bg-slate-800 w-24 h-24 rounded-full overflow-hidden mt-1 transition-all duration-300 hover:scale-110">
                        <img
                            alt="Avatar"
                            src={`https://robohash.org/${player.username}`}
                        />
                    </div>
                    <button
                        className="px-4 py-2 mt-4 bg-red-500 text-white font-bold rounded-lg shadow-md  transition-all duration-500 hover:text-slate-400 hover:bg-red-700 hover:-translate-x-1"
                        onClick={() => dispatch(logout())} // Cerrar sesión con Redux
                    >
                        <RiLogoutBoxLine className="inline-block mb-1 mr-1" />
                        Cerrar Sesión
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-md p-6 border border-slate-500 rounded">
                    <h2 className="text-2xl font-bold text-center text-slate-100 mb-6">
                        Iniciar Sesión
                    </h2>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm font-semibold text-slate-300">
                                Email o Username
                            </label>
                            <input
                                type="text"
                                placeholder="Ingresa tu email o Username"
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-300">
                                Contraseña
                            </label>
                            <div className="flex justify-center items-center space-x-2">
                                <input
                                    type={viewPassword ? "text" : "password"}
                                    placeholder="Ingresa tu contraseña"
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <IoMdEye
                                    className="text-4xl fill-[#FFFFFF] cursor-pointer"
                                    onClick={() =>
                                        setViewPassword(!viewPassword)
                                    }
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-slate-200 font-semibold bg-indigo-800 rounded-lg"
                        >
                            Inicia Sesión
                        </button>

                        <div className="text-slate-200 font-semibold space-y-2 text-center">
                            <p>
                                ¿No tienes cuenta?{" "}
                                <Link
                                    className="underline hover:text-slate-400"
                                    to="/ladder/registro"
                                >
                                    Regístrate aquí
                                </Link>
                            </p>
                            <p>
                                <Link
                                    className="underline hover:text-slate-400"
                                    to="/ladder/recuperar-password"
                                >
                                    ¿Olvidaste Tu Contraseña?
                                </Link>
                            </p>
                        </div>
                    </form>

                    <div className="flex items-center justify-center my-4">
                        <span className="h-px w-full bg-gray-300"></span>
                        <span className="px-3 text-sm text-gray-500">O</span>
                        <span className="h-px w-full bg-gray-300"></span>
                    </div>

                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            const token = credentialResponse.credential;
                            loginGoogle(token);
                        }}
                        onError={() => console.log("Login failed")}
                    />
                </div>
            )}
        </div>
    );
};
