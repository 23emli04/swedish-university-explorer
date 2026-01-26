import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layout components
import NavBar from "../components/layout/NavBar.jsx";
import Footer from "../components/layout/Footer.jsx";

// Education pages
import ProvidersPage from "../features/education/pages/ProvidersPage.jsx";
import EventsPage from "../features/education/pages/EventsPage.jsx";
import EducationInfoPage from "../features/education/pages/EducationInfoPage.jsx";
import HomePage from "../features/education/pages/HomePage.jsx";
import ProviderSpecificPage from "../features/education/pages/ProviderSpecificPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen bg-base-100">
                <NavBar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/education" element={<ProvidersPage />} />
                        <Route path="/education/providers/:id" element={<ProviderSpecificPage />} />
                        <Route path="/education/events" element={<EventsPage />} />
                        <Route path="/education/providers/education/:id" element={<EducationInfoPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App
