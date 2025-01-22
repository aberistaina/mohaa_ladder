import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { Reportes } from "./components/Reportes";
import { RegisterPage } from "./pages/RegisterPage";
import { UserPage } from "./pages/UserPage";
import { ClanPage } from "./pages/ClanPage";
import { DetalleJugadorPage } from "./pages/DetalleJugadorPage";
import { EtapasPages } from "./pages/EtapasPages";
import { LadderPage } from "./pages/LadderPage";
import { ReclutarPage } from "./pages/reclutarPage";
import { EditarClanPage } from "./pages/EditarClanPage";
import { CrearClanpage } from "./pages/CrearClanpage";
import { EditarMiCuenta } from "./components/editarMiCuenta/EditarMiCuenta";
import { JugadoresPages } from "./pages/JugadoresPages";
import { LadderLayout } from "./layouts/LadderLayout";
import { LoginProvider } from "./context/LoginContext";
import { HomePageLayout } from "./layouts/HomePageLayout";
import { ValidarCuenta } from "./pages/ValidarCuenta";
import { RecuperarPassword } from "./pages/RecuperarPassword";
import { ModificarPassword } from "./pages/ModificarPassword";
import { DescargasPages } from "./pages/DescargasPages";
import { VolverAJugar } from "./pages/VolverAJugar";
import { ServidoresPages } from "./pages/ServidoresPages";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Página principal */}
                <Route path="/" element={<HomePageLayout><HomePage /></HomePageLayout>} />
                <Route path="/descargas" element={<HomePageLayout><DescargasPages /></HomePageLayout>} />
                <Route path="/volver-a-jugar" element={<HomePageLayout><VolverAJugar /></HomePageLayout>} />
                <Route path="/servidores" element={<HomePageLayout><ServidoresPages /></HomePageLayout>} />

                {/* Rutas Ladder */}

                    <Route
                        path="ladder"
                        element={
                            <LoginProvider>
                                <LadderLayout />
                            </LoginProvider>
                        }
                    >
                        
                        <Route path="micuenta" element={<UserPage />} />
                        <Route path="reportes" element={<Reportes />} />
                        <Route path="registro" element={<RegisterPage />} />
                        <Route path="detalle-clan/:id" element={<ClanPage />} />
                        <Route
                            path="detalle-jugador/:id"
                            element={<DetalleJugadorPage />}
                        />
                        <Route path="juego/:id" element={<EtapasPages />} />
                        <Route path="etapa/:id" element={<LadderPage />} />
                        <Route
                            path="crear-clan/:id"
                            element={<CrearClanpage />}
                        />
                        <Route
                            path="editar-clan/:id"
                            element={<EditarClanPage />}
                        />
                        <Route
                            path="reclutar/:clanId/:etapaId"
                            element={<ReclutarPage />}
                        />
                        <Route
                            path="editar-micuenta/:id"
                            element={<EditarMiCuenta />}
                        />
                        <Route path="jugadores" element={<JugadoresPages />} />
                        <Route path="validar-cuenta" element={<ValidarCuenta />} />
                        <Route path="recuperar-password" element={<RecuperarPassword />} />
                        <Route path="modificar-password/:email" element={<ModificarPassword />} />
                    </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
