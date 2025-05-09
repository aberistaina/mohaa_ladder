import React from 'react'

export const DescargasPages = () => {
    return (
        <>
            <div className="animated-background2 w-full min-h-screen flex flex-wrap justify-around items-center">
                <div className="flex flex-col items-center justify-center mb-4 sm:w-full md:w-1/3 lg:w-1/3">
                    <img src="logoJuego.png" alt="Logo Juego" className="w-max-full h-auto mb-4" />
                    <a href="https://drive.usercontent.google.com/download?id=1vIffXqAhc14WgliZlzJPFwxuW4XSf8_d&export=download&authuser=0" target='blank'>
                        <button className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-900 transition duration-300">
                            Descargar MOH:AA
                        </button>
                    </a>
                </div>

                <div className="flex flex-col items-center justify-center mb-4 sm:w-full md:w-1/3 lg:w-1/3">
                    <img src="logoTs3.png" alt="Logo Juego" className="max-w-full h-auto mb-4" />
                    <a href="https://teamspeak.com/es/downloads/#ts3client" target='blank'>
                        <button className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-900 transition duration-300">
                            Descargar TS3
                        </button>
                    </a>
                </div>

                <div className="flex flex-col items-center justify-center mb-4 sm:w-full md:w-1/3 lg:w-1/3">
                    <img src="voluteLogo.png" alt="Logo Juego" className="max-w-full h-auto mb-4" />
                    <a href="https://dl.volute.io/downloads/volute_latest.zip" download>
                        <button className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-900 transition duration-300">
                            Descargar Volute
                        </button>
                    </a>
                </div>
            </div>
        </>
    )
}
