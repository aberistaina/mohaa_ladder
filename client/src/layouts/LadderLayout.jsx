import { Outlet } from "react-router-dom";
import "../index.css";

// Componentes
import { NavBar } from "../components/NavBar";
import { Login } from "../components/Login";
import { Banner } from "../components/Banner";
import { Footer } from "../components/Footer";
import { ChatBot } from "../components/ChatBot";

export const LadderLayout = () => {
    return (
        <div className="animated-background">
            <div className="container mx-auto grid grid-cols-1 border-r border-l border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 min-h-[calc(100vh-57px)] lg:grid-cols-12 lg:min-h-screen">
                
                {/* Login + Navbar Movile */}
                <div className="lg:hidden col-span-12">
                    <section className="p-4">
                        <NavBar />
                    </section>
                    <section className="p-4">
                        <Login />
                    </section>
                </div>

                {/* Banner */}
                <header className="col-span-12 text-white flex items-center justify-center text-2xl">
                    <Banner />
                </header>

                {/* Login + Navbar */}
                <aside className="flex-col ml-8 mb-4 lg:ml-0 lg:mb-0 lg:flex lg:col-span-3 lg:min-h-[calc(100vh-64px)]">
                    <div className="hidden lg:block">
                        <div className="flex items-center justify-center p-4">
                            <Login />
                        </div>
                    </div>
                    <div className="p-4 hidden lg:block">
                        <NavBar />
                    </div>
                </aside>

                {/* Body */}
                <main className="lg:col-span-9 flex items-start justify-center text-2xl p-4">
                    <Outlet />
                </main>
            </div>

            <div>
                {/* Footer */}
                <footer className="w-full">
                    <Footer />
                </footer>
            </div>

                {/* Bot */}
                    <ChatBot />

        </div>
    );
};