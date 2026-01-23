import React, { useEffect, useState } from "react";

export default function ThemeButton() {

    const getInitialTheme = () => {
        if (typeof window === "undefined") return "light";
        const stored = localStorage.getItem("theme");
        if (stored) return stored;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "dark" : "light";
    };

    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };

    return (
        <label
            className="flex items-center gap-3 cursor-pointer select-none ml-2"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Sol Icon */}
            <div className="flex items-center justify-center w-5 h-5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 stroke-current"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
            </div>

            <input
                type="checkbox"
                className="toggle toggle-sm border-base-content theme-controller"
                checked={theme === "dark"}
                onChange={toggleTheme}
            />

            {/* Måne Icon */}
            <div className="flex items-center justify-center w-5 h-5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 stroke-current"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            </div>
        </label>
    );
}
