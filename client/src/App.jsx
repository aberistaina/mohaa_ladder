import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Banner } from "./components/Banner"
import { NavBar } from "./components/NavBar"
import { HomePage } from "./pages/HomePage"


function App() {
  
  return (
    <>
        <Banner />
        <NavBar />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
