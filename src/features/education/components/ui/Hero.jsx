import { useState, useEffect } from 'react';

export default function Hero({ onSearch }) {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        // Wait 400ms after the user stops typing before triggering search
        const timer = setTimeout(() => {
            onSearch(inputValue);
        }, 400);

        return () => clearTimeout(timer); // Cleanup if user types again before 400ms
    }, [inputValue, onSearch]);

    return (
        <div className="hero bg-base-100 py-12 border-b border-base-200">
            <div className="hero-content text-center">
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary">
                        Hitta utbildningar, lärosäten och yrken
                    </h1>
                    <p className="py-4 text-lg opacity-70">
                        Din plattform för att hitta allt inom utbildning!
                    </p>
                    <div className="relative max-w-md mx-auto mt-6">
                        <input
                            type="text"
                            value={inputValue}
                            placeholder="Sök utbildningar, skolor eller jobb..."
                            className="input input-bordered input-lg w-full pr-12 shadow-lg focus:input-primary"
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40">
                            🔍
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}