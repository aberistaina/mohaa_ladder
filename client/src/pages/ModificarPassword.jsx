import { fetchHook } from "../hooks/fetchHook";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useSelector } from 'react-redux';

// Iconos
import { MdOutlineBrowserUpdated } from "react-icons/md";
import { IoMdEye } from "react-icons/io";

export const ModificarPassword = () => {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const player = useSelector((state) => state.auth.player);
    const contextToken = useSelector((state) => state.auth.token);
    /* const { token: contextToken } = useContext(LoginContext) */
    
    const [viewPassword, setViewPassword] = useState(false)
    const { email } = useParams()
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("")
    const [params] = useSearchParams()

    const [error, setError] = useState({
        password: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const newError = {password: password !== repeatPassword,};
            setError(newError);


            if (newError.password) {
                enqueueSnackbar("Las Contraseñas No Coinciden", { variant: "error" })
                return
            } else {
            const token = params.get("token") || contextToken
            
            const url = `https://mohaax.cl/api/v1/players/modificar-password/${email}?token=${token}`;
            const method = "POST";

            const body = {
                password,
                repeatPassword
            };

            const data = await fetchHook(url, method, body);
            if (data.code === 200) {
                enqueueSnackbar(data.message, { variant: "success" });
                navigate("/ladder");
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
        <div className="w-full max-w-md p-6 border border-slate-500 rounded mb-10 md:mb-0 md:mt-4">
                    <h2 className="text-2xl font-bold text-center text-slate-100 mb-6">Modificar Contraseña</h2>
                    <form className="space-y-4 flex justify-center flex-col" onSubmit={handleSubmit} >
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
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 text-xl"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <IoMdEye className="text-4xl fill-[#FFFFFF] cursor-pointer" onClick={() => setViewPassword(!viewPassword)} />
                        </div>
                        
                    </div>

                    <div>
                        <label
                            htmlFor="repeatPassword"
                            className="block text-sm font-semibold text-slate-300"
                        >
                            Repite tu Contraseña
                        </label>
                        <div className="flex justify-center items-center space-x-2">
                            <input
                                type={viewPassword ? "text" : "password"}
                                id="repeatPassword"
                                placeholder="Repite tu contraseña"
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 text-xl"
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                            <IoMdEye className="text-4xl fill-[#FFFFFF] cursor-pointer" onClick={() => setViewPassword(!viewPassword)} />
                        </div>
                        {password !== repeatPassword && (
                            <span className="text-red-500">
                                Las contraseñas no coinciden
                            </span>
                        )}
                    </div>
                    

                    <button
                        className="mb-10 px-4 py-3 mr-10 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-800 hover:text-slate-400 transition-all duration-300 text-lg hover:-translate-x-1"
                    >
                        <MdOutlineBrowserUpdated className="inline-block mb-1 mr-1" />
                        Modificar Contraseña
                    </button>
                    </form>
                </div>
    </>
    )
}
