import { fetchHook } from "../hooks/fetchHook";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { IoMdEye } from "react-icons/io";

export const ModificarPassword = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { email } = useParams();
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [params] = useSearchParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = params.get("token")
            const url = `http://localhost:3000/api/v1/players/modificar-password/${email}?token=${token}`;
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
        } catch (error) {
            console.log(error);
        }
    }

return (
    <>
        <div className="w-full max-w-md p-6 border border-slate-500 rounded">
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
                            type="password"
                            id="password"
                            placeholder="Ingresa tu contraseña"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <IoMdEye className="text-4xl fill-[#FFFFFF] cursor-pointer" />
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
                                type="password"
                                id="repeatPassword"
                                placeholder="Repite tu contraseña"
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                            <IoMdEye className="text-4xl fill-[#FFFFFF] cursor-pointer" />
                        </div>
                    </div>

                    <button
                        className="mb-10 px-4 py-4 mx-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300"
                    >
                        Recuperar Contraseña
                    </button>
                    </form>
                </div>
    </>
    )
}
