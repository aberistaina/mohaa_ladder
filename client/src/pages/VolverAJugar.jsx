import React from 'react'

export const VolverAJugar = () => {
  return (
    <>
        <div className="animated-background2 w-full h-screen py-6">
            <section>
              {/* Tíitulo */}
              <h1 className='text-slate-200 text-center text-4xl font-bold'>Guía para volver a jugar MOHAA</h1>
              <img src='../../public/icono_mohaa.svg' alt='Logo Mohaa' className='w-10 h-auto mx-auto my-6'/>
              <hr className='w-1/2 mx-auto border-slate-500 mb-6'></hr>
              
              {/* SubTítulo */}
              <h1 className='text-slate-200 text-center text-3xl font-semibold'>¿Como puedo volver a jugar?</h1>
              <h1 className='text-slate-200 text-center text-3xl font-semibold'> 🤷‍♂️</h1>
              <hr className='w-1/3 mx-auto border-slate-500 mt-6'></hr>

              {/* Paso N°1 */}
              <h2 className='text-slate-200 text-center text-2xl my-6 underline'>✏️Paso N°1: Descargas</h2>
              <p className='text-slate-200 text-center text-xl'>Para iniciar tu participación en nuestra comunidad, debes descargar los archivos necesarios para la instalación del juego.</p>
              <p className='text-slate-200 text-center text-xl mt-4'>Recuerda que debes descargar el juego, el cliente de TeamSpeak, y el Volute, los cuales los encuentras en nuestra sección de Descargas.</p>
              <hr className='w-1/3 mx-auto border-slate-500 mt-6'></hr>
              
              {/* Paso N°2 */}
              <h2 className='text-slate-200 text-center text-2xl my-6 underline'>✏️Paso N°2: Instalación</h2>
              <p className='text-slate-200 text-center text-xl'>Para instalar los programas descargados, se debe hacer lo siguiente:</p>
              <ul className='text-slate-200 text-center text-xl mt-4 list-disc list-inside'>
                <li className='text-slate-200 text-center text-xl mt-4 font-light'>Instalar el programa Volute. 📌</li>
                <li className='text-slate-200 text-center text-xl mt-4 font-light'>Tener la carpeta del juego descargado en la ruta de tu preferencia. 📌</li>
                <li className='text-slate-200 text-center text-xl mt-4 font-light'>Crear una cuenta de <a className='underline text-red-600 font-bold hover:text-red-800 duration-300 transition-colors' href='https://volute.io/' target='blank'>Volute</a> en su página web. 📌</li>
                <li className='text-slate-200 text-center text-xl mt-4 font-light'>Abrir Volute y rellenar la información solicitada. 📌</li>
                <li className='flex justify-center mt-4'><img className='hover:scale-125 duration-300 transition-all mx-auto max-w-md h-auto' src='../../public/ejemploVolute.png' alt='voluteIMG' /></li>
                <li className='text-slate-200 text-center text-xl mt-4 font-light'>La ID de Volute y la API KEY la puedes encontrar en tu cuenta de Volute. 📌</li>
                <li className='text-slate-200 text-center text-xl mt-4 font-light'>La ruta del juego es el lugar en donde tienes guardada la carpeta del juego (Ej. C/Escritorio/Juegos/MOHAA/MOHAA.exe) 📌</li>
                <li className='text-slate-200 text-center text-xl mt-4 font-light'>Recuerda que en MOHAA Settings, debes agregar el MOHAA.exe. 📌</li>
                <li className='text-slate-200 text-center text-xl mt-4 font-light'>Debes agregar la IP y password del servidor de MOHAA al que deseas entrar. 📌</li>
                <li className='text-slate-200 text-center text-xl mt-4 font-light'>Al tener todos los datos rellenados en el Volute, debes apretar el botón de "Connect". 📌</li>
                <li className='text-slate-200 text-center text-xl mt-4 font-light'>Y listo, al completar todos los pasos, ingresarás al servidor y estarás listo para jugar! 📌</li>
              </ul>
              <hr className='w-1/3 mx-auto border-slate-500 mt-6'></hr>
              
              {/* Paso N°3 */}
              <h2 className='text-slate-200 text-center text-2xl my-6 underline'>✏️Paso N°3: Ingresar a TeamSpeak 3 (TS3)</h2>
              <p className='text-slate-200 text-center text-xl'>Instala el programa TeamSpeak 3 Client.</p>
              <ul className='text-slate-200 text-center text-xl mt-4 list-inside list-disc'>
                <li className='text-slate-200 text-center text-xl mt-4 font-light'>Abre el programa TeamSpeak 3 Client (se recomienda ejecutar el programa como administrador). 📌</li>
                <li className='text-slate-200 text-center text-xl mt-4 font-light'>Luego, en la parte superior del programa debes hacer clic en "Conexiones", y luego en "Conectarse". 📌</li>
                <li className='text-slate-200 text-center text-xl mt-4 font-light'>Ahora aparecerá una ventana en la cual debes rellenar los datos del servidor(mohaax) y de tu alias. 📌</li>
                <li className='text-slate-200 text-center text-xl mt-4 font-light'>Finalmente, se debe apretar "Conectarse" y listo, ya estarás dentro del servidor de TS. 📌</li>
                <li className='flex justify-center mt-4'><img className='hover:scale-125 duration-300 transition-all mx-auto max-w-md h-auto' src='../../public/ejemploTS.png' alt='tsIMG'/></li>
              </ul>
            </section>
        </div>
    </>
  )
}