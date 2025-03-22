import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export const Login = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { player, isAuthenticated } = useSelector((state) => state.auth); // Obtener usuario desde Redux

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [viewPassword, setViewPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        const url = "http://localhost:3000/api/v1/login";
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
                dispatch(login({ player: data.player, token: data.token }));
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

    const loginGoogle = async(token) =>{
        const url = 'http://localhost:3000/api/v1/login/google';
                const method = 'POST';
                const decodedToken = jwtDecode(token);
                const body = {
                    token,
                    name: decodedToken.name,
                    email: decodedToken.email,
                };
        
                try {
                    const response = await fetch(url, {
                        method,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(body),
                    });
                    const data = await response.json();
        
                    if (data.code === 200) {
                        enqueueSnackbar('Sesión iniciada correctamente con Google', { variant: 'success' });
                        dispatch(login({ player: data.player, token: data.token }));
                        navigate('/ladder');
                    } else {
                        enqueueSnackbar(data.message, { variant: 'error' });
                    }
                } catch (error) {
                    enqueueSnackbar('Error al iniciar sesión con Google', { variant: 'error' });
                }
    }

    return (
        <div>
            {isAuthenticated ? (
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold text-center text-slate-100">
                        Bienvenid@
                    </h1>
                    <h3 className="text-xl font-bold text-center text-slate-300 mb-1">
                        {player.username}
                    </h3>
                    <button
                        className="px-4 py-2 mt-4 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-800"
                        onClick={() => dispatch(logout())} // Cerrar sesión con Redux
                    >
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

                        <p className="text-slate-200 font-semibold">
                            ¿No tienes cuenta?{" "}
                            <Link className="underline hover:text-slate-400" to="/ladder/registro">
                                Regístrate aquí
                            </Link>
                            <div className="text-center">
                                <Link className="underline hover:text-slate-400" to="/ladder/recuperar-password">
                                    ¿Olvidaste Tu Contraseña?
                                </Link>
                            </div>
                        </p>
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
