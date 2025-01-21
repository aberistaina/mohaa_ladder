import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Login } from "../components/Login";
import { Banner } from "../components/Banner";
import { ChatBot } from "../components/ChatBot";

export const LadderLayout = () => {
    return (
        <div className="bg-slate-700 min-h-screen">
            <div className="container mx-auto grid grid-cols-1 bg-gradient-to-r from-slate-800 to-slate-900 lg:grid-cols-12 min-h-screen">
                {/* Banner */}
                <header className="col-span-12 text-white flex items-center justify-center text-2xl px-4">
                    <Banner />
                </header>

                {/* Login + Navbar */}
                <aside className="lg:col-span-3 flex flex-col lg:min-h-[calc(100vh-64px)]">
                    <div className="flex items-center justify-center p-4">
                        <Login />
                    </div>
                    <div className="p-4">
                        <NavBar />
                    </div>
                </aside>

                {/* Body */}
                <main className="lg:col-span-9 flex items-start justify-center text-2xl p-4">
                    <Outlet />
                </main>
            </div>
            <ChatBot />
        </div>
    );
};
