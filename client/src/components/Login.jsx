import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useState, useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { Link } from 'react-router-dom';
import { IoMdEye } from "react-icons/io";


export const Login = () => {

    const { login, loginGoogle, logout, player } = useContext(LoginContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [viewPassword, setViewPassword] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault();
        login(email, password);
    };
            

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
                <form className="space-y-4" onSubmit= {handleLogin}>
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-slate-300"
                        >
                            Email o Username
                        </label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Ingresa tu email o Username"
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
                        <div className="flex justify-center items-center space-x-2">
                            <input
                                type={viewPassword ? "text" : "password"}
                                id="password"
                                placeholder="Ingresa tu contraseña"
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <IoMdEye className="text-4xl fill-[#FFFFFF] cursor-pointer" onClick={() => setViewPassword(!viewPassword)} />
                        </div>
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
                    <p className='text-slate-200 font-semibold'>¿No tienes cuenta?, Regístrate <Link className="underline" to="/ladder/registro">Aquí</Link>
                    </p>
                    <p className='text-slate-200 font-semibold text-center'><Link to="/ladder/recuperar-password">¿Olvidaste tu Contraseña?</Link></p>
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