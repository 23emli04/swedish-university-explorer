import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";



// Education pages
import ProvidersPage from "../features/education/pages/ProvidersPage.jsx";
import EventsPage from "../features/education/pages/EventsPage.jsx";
import EducationInfoPage from "../features/education/pages/EducationInfoPage.jsx";
import HomePage from "../features/education/pages/HomePage.jsx";
import ProviderSpecificPage from "../features/education/pages/ProviderSpecificPage.jsx";
function App() {

    return (
        <BrowserRouter>
            <div className="max-w-8xl mx-auto flex flex-col min-h-screen">
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>

                        <Route path="/education" element={<ProvidersPage/>}/>
                        <Route path="/education/providers/:id" element={<ProviderSpecificPage/>}/>
                        <Route path="/education/events" element={<EventsPage/>}/>
                        <Route path="/education/info" element={<EducationInfoPage/>}/>
                    </Routes>
                </main>

            </div>
        </BrowserRouter>
    )
}

export default App
