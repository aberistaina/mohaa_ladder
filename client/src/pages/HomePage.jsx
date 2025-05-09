import { motion } from "framer-motion";

export const HomePage = () => {
    return (
        <div className="w-full h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/HomeWallPaper.png')" }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-slate-900 bg-opacity-90 flex flex-col items-center justify-center text-white text-center px-4">

            {/* Hero Text */}
            <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold mb-4"
            >
            ¡Únete a la batalla por el honor!
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-2xl mb-8 max-w-2xl"
            >
            MOHAA X Chile es más que una comunidad, es una hermandad de veteranos digitales que aman la historia, el trabajo en equipo y la competencia.
            </motion.p>

            {/* Botón CTA */}
            <motion.a
            href="/ladder"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-slate-950 hover:bg-slate-800 hover:text-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300"
            >
            Entra a nuestro Ladder
            </motion.a>
        </div>
        </div>
    );
};