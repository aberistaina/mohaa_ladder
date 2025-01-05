import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { fetchHook } from '../hooks/fetchHook';
import { guardarLocalStorage, obtenerLocalStorage, limpiarLocalStorage } from '../hooks/localStorage';
import { useState, useEffect } from 'react';
import {useSnackbar} from 'notistack';


export const Login = () => {

    const { enqueueSnackbar } = useSnackbar();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [player, setPlayer] = useState({});

    const url = "http://localhost:3000/api/v1/login/google";
    const method = "POST";
    
    const loginGoogle = async (token, name, email) => {

            const body = {
                token,
                name,
                email
            };
                const data = await fetchHook(url, method, body);

                if (data.code === 200) {
                    enqueueSnackbar(data.message, { variant: "success" });
                    guardarLocalStorage(data.token, data.player);
                    setTimeout(function () {
                        window.location.href = "/";
                    }, 1000);
                }else{
                    enqueueSnackbar(data.message, { variant: "error" });
                }
                
            };

    const login = async (e) => {
        e.preventDefault()
    
        const url = "http://localhost:3000/api/v1/login";
        const method = "POST";
        const body = {
            email,
            password
        };
    
        const data = await fetchHook(url, method, body);
        if (data.code === 200) {
            enqueueSnackbar(data.message, { variant: "success" });
            guardarLocalStorage(data.token, data.player);
            setTimeout(function () {
                window.location.href = "/";
            }, 1000);
        }else{
            enqueueSnackbar(data.message, { variant: "error" });
        }
        
    };

    const logout = () => {
        enqueueSnackbar("Sesión Cerrada", { variant: "warning" })
        setTimeout(function () {
            window.location.href = "/";
            limpiarLocalStorage();
            setPlayer();
        }, 1000);
        
    };

    useEffect(() => {
        const { playerData } = obtenerLocalStorage()
        setPlayer(playerData);
    }, []);
            

    return (
        <div>
            { player 
            ? (<div className="flex flex-col items-center justify-center">
                {player ? (
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-bold text-center text-slate-100">Bienvenido</h1>
                        <h3 className="text-xl font-bold text-center text-slate-100 mb-1">{player.username}</h3>
                        <h3 className="text-lg font-bold text-center text-slate-100 mb-2">ID: {player.id}</h3>
                        <button
                            className="px-4 py-2 mt-4 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300"
                            onClick={() => {logout()}}
                            
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                ) : (
                    <h1 className="text-2xl font-bold text-center text-slate-100">No hay jugador</h1>
                )}
            </div>
            
            ) 
            : 
            (
                <div className="w-full max-w-md p-6 border border-slate-500 rounded">
                {/* Título */}
                <h2 className="text-2xl font-bold text-center text-slate-100 mb-6">
                    Iniciar Sesión
                </h2>

                {/* Formulario */}
                <form className="space-y-4" onSubmit= {login}>
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

                    {/* Botón de iniciar sesión */}
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-slate-200 font-semibold bg-indigo-800 rounded-lg transition-all duration-300 hover:bg-indigo-900"
                        >
                            Inicia Sesión
                        </button>
                    </div>
                    <p className='text-slate-200 font-semibold'>¿No tienes cuenta?, Regístrate <a className="underline" href="/registro">Aquí</a></p>
                </form>

                {/* Divider */}
                <div className="flex items-center justify-center my-4">
                    <span className="h-px w-full bg-gray-300"></span>
                    <span className="px-3 text-sm text-gray-500">O</span>
                    <span className="h-px w-full bg-gray-300"></span>
                </div>

                {/* Botón de Google */}
                <div>
                    <GoogleLogin 
                    onSuccess={(credentialResponse) => {
                        const token = credentialResponse.credential
                        const username = jwtDecode(credentialResponse.credential).name
                        const email = jwtDecode(credentialResponse.credential).email
                        loginGoogle(token, username, email)
                    }} 
                    
                    onError={() => console.log("login failed")}
                    />
                </div>
            </div>

            )}
            
        </div>
    );
};