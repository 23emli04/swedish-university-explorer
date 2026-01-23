import Hero from "../components/genericComponents/Hero.jsx";

import {useEvents} from "../hooks/EventHooks.jsx";
import {useState} from "react";
import GamesTable from "../components/gamesComponents/GamesTable.jsx";
import AllLeagues from "../components/genericComponents/AllLeagues.jsx";

export default function HomePage() {

    const currentDate = new Date()
    const date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()
    const [chosenGender, setChosenGender] = useState("ALL")
    const [selectedDate, setSelectedDate] = useState(date)
    const events = useEvents(selectedDate, chosenGender)
    return (
        <>
            <Hero/>

            <div className="container mx-auto mt-4 max-w-4xl px-4">
                <h2 className="text-2xl font-bold my-4 mx-2">Matcher i alla sporter:</h2>

                <button
                    type="button"
                    className={`btn mx-2 transition-colors duration-200 mb-2 ${
                    chosenGender === "ALL" ? "btn-warning" : "btn-outline btn-warning"
                }`}
                    onClick={() => {
                        setChosenGender("ALL")
                    }}
                >
                    Alla
                </button>

                <button
                    type="button"
                    className={`btn mx-2 transition-colors duration-200 mb-2 ${
                        chosenGender === "MEN" ? "btn-warning" : "btn-outline btn-warning"
                    }`}
                    onClick={() => {
                        setChosenGender("MEN")
                    }}
                >
                    Herr
                </button>
                <button
                    type="button"
                    className={`btn mx-2 transition-colors duration-200 mb-2 ${
                        chosenGender === "WOMEN" ? "btn-warning" : "btn-outline btn-warning"
                    }`}
                    onClick={() => {
                        setChosenGender("WOMEN")
                    }}
                >
                    Dam
                </button>
                <input
                    type="date"
                    className="input input-warning mx-2 mb-2"
                    value={selectedDate}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                            setSelectedDate(date);
                        } else {
                            setSelectedDate(value);
                        }
                    }}
                />


                <GamesTable
                    items={events.data}
                    loading={events.loading}
                    error={events.err}
                />
                <h2 className="text-xl font-bold my-4 mx-2">Alla ligor vi har:</h2>
                <AllLeagues/>
            </div>

        </>
    )
}