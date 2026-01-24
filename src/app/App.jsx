import './App.css'
import HomePage from "../features/sports/pages/HomePage.jsx";
import Navbar from "../features/sports/components/genericComponents/NavBar.jsx";
import Footer from "../features/sports/components/genericComponents/Footer.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EventPage from "../features/sports/pages/EventPage.jsx";
import SPORTS from "../config.js";
import {useLeaguesWithSportIdAndQuery} from "../features/sports/hooks/LeagueHooks.jsx";
import LeaguePage from "../features/sports/pages/LeaguePage.jsx";
import TeamPage from "../features/sports/pages/TeamPage.jsx";
import NotFoundPage from "../features/sports/pages/info/NotFoundPage.jsx";
import AboutUsPage from "../features/sports/pages/info/AboutUsPage.jsx";

import formatLeaguePath from "../features/sports/components/formatLeaguePath.jsx";

// Education pages
import ProvidersPage from "../features/education/pages/ProvidersPage.jsx";
import EventsPage from "../features/education/pages/EventsPage.jsx";
import EducationInfoPage from "../features/education/pages/EducationInfoPage.jsx";

function App() {

    const currentYear = new Date().getFullYear();
    const leagueResults = SPORTS.map((sport) => useLeaguesWithSportIdAndQuery(sport.sportId, `&activeDate=${currentYear + sport.activeYearOffset}`));
    const leaguesData = {};
    const errors = {};
    let loading = false;
    SPORTS.forEach((sport, index) => {
        const result = leagueResults[index];
        leaguesData[sport.leagueKey] = result.data?.filter(l => !/final|kval/i.test(l.name)) || [];
        errors[sport.leagueKey] = result.error;
        loading = loading || result.loading;
    });

    function generateLeaguePageRoutes() {
        return Object.keys(leaguesData).flatMap(key =>
            leaguesData[key].map(league => (
                <Route
                    key={league.id}
                    path={`/league/${formatLeaguePath(league.name)}/${league.teamClass.toLowerCase()}`}
                    element={
                        <LeaguePage initialLeagueId={league.id}/>
                    }
                />
            ))
        );
    }

    return (
        <BrowserRouter>
            <div className="max-w-8xl mx-auto flex flex-col min-h-screen">
                <Navbar leaguesData={leaguesData}
                        loading={loading}
                        errors={errors}/>
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/event/:id" element={<EventPage/>}/>
                        {generateLeaguePageRoutes()}
                        <Route path="/team/:id" element={<TeamPage/>}/>
                        <Route path="/about-us" element={<AboutUsPage/>}/>
                        
                        {/* Education routes */}
                        <Route path="/education" element={<ProvidersPage/>}/>
                        <Route path="/education/providers" element={<ProvidersPage/>}/>
                        <Route path="/education/events" element={<EventsPage/>}/>
                        <Route path="/education/info" element={<EducationInfoPage/>}/>
                        
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}

export default App
