import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { fetchHook } from "../hooks/FetchHook"
import { formatText } from "../utils/formatTextBot"

export const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { handleSubmit, reset, register } = useForm()
    const [userMessage, setUserMessage] = useState([])
    const chat = useRef(null)

    useEffect(() => {
        if (chat.current) {
            const lastMessage = chat.current.lastElementChild;
            if (lastMessage) {
                chat.current.scrollTop = lastMessage.offsetTop -30
            }
        }
    }, [userMessage]);

    const onSubmit = async (data) => {
        const { message } = data
        reset();
        const mensajeUsuario = {
            origen: "Tú",
            message: data.message,
        };
        setUserMessage((prevMessages) => [...prevMessages, mensajeUsuario]);
        const urlProduccion = "https://bot-mohaa.vercel.app/axisbot/chat";
        const response = await fetchHook(urlProduccion, "POST", data)
        console.log(response.response)
        const respuestaBot = response.response
        const mensajeBot = {
            origen: "🤖AxisBot🤖",
            message: respuestaBot,
        }
        setUserMessage((prevMessages) => [...prevMessages, mensajeBot])
    };

    return (
        <>
            <div>
                {/* Botón para abrir el chat */}
                <img
                    className={`right-0 w-24 fixed bottom-12 md:bottom-5 md:w-36 md:right-6 cursor-pointer hover:scale-110 transition-transform duration-700 ${
                        !isOpen ? "block" : "hidden"
                    } `}
                    src="/bot.png"
                    alt=""
                    onClick={() => setIsOpen(true)}
                />
                {/* Chatbox */}
                {isOpen && (
                    <div className="fixed bottom-4 right-4 w-80 h-[96] bg-white border border-gray-300 shadow-lg rounded-lg">
                        <div className="flex justify-between items-center p-2 bg-yellow-900 text-white rounded-t-lg">
                            <span>AxisBot</span>
                            <button
                                className="text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto h-96" ref={chat}>
                            <p className="pb-1 text-[13px]">
                                Bienvenido ¿Que deseas saber sobre La Comunidad Mohaax.cl?
                            </p>
                            <p className="pb-4 text-[13px] text-center">
                                Puedes preguntarme cosas como...
                            </p>
                            <button
                                className="w-full px-4 text-[14px] bg-yellow-900 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                                onClick={() => onSubmit({ message: "¿Como Puedo Volver A jugar?" })}
                            >
                                ¿Como Puedo Volver A jugar?
                            </button>

                            <button
                                className="w-full my-2 px-4 text-[14px] bg-yellow-900 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                                onClick={() => onSubmit({ message: "¿Hay Próximos Torneos?" })}
                            >
                                ¿Hay Próximos Torneos?
                            </button>

                            {userMessage.map((message, index) => {
                                const isUser = message.origen === "Tú";

                                return (
                                    <div
                                        key={index}
                                        className={`flex ${
                                            isUser
                                                ? "justify-start"
                                                : "justify-end"
                                        } mb-4`}
                                    >
                                        <div
                                            className={`p-3 rounded-lg shadow-md w-3/4 max-w-md ${
                                                isUser
                                                    ? "bg-green-300 text-blue-700"
                                                    : "bg-gray-200 text-gray-800"
                                            }`}
                                        >
                                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                <span>{message.origen}</span>
                                            </div>

                                            <p
                                                dangerouslySetInnerHTML={formatText(
                                                    message.message
                                                )}
                                            ></p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <form
                            className="p-2 border-t border-gray-200"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <input
                                autoComplete="off"
                                type="text"
                                placeholder="Escribe un mensaje..."
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("message", {
                                    required: "El mensaje es obligatorio",
                                })}
                            />
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}
