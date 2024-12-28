import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Banner } from "./components/Banner"
import { NavBar } from "./components/NavBar"
import { HomePage } from "./pages/HomePage"
import { Login } from "./components/Login"
import { MiCuenta } from "./components/MiCuenta"


function App() {
  
  return (
    <>
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
            {/* Banner */}
            <header className="col-span-12 bg-gray-400 text-white flex items-center justify-center text-2xl p-4">
                <Banner />
            </header>

            {/* Login + Navbar */}
            <aside className="lg:col-span-3 bg-gradient-to-r from-green-200 to-blue-200 flex flex-col lg:min-h-[calc(100vh-64px)]">
                <div className="flex items-center justify-center bg-green-300 p-4">
                    <Login />
                </div>
                <div className="flex items-center justify-center bg-yellow-300 p-4">
                    <NavBar />
                </div>
            </aside>

            {/* Body */}
            <main className="lg:col-span-9 bg-purple-300 flex items-start justify-center text-2xl p-4">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/micuenta" element={<MiCuenta />} />
                    </Routes>
                </BrowserRouter>
            </main>
        </div>

        
    </>
  )
}

export default App




        
        