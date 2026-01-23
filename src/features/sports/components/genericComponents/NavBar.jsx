    import React, { useState, useEffect, useRef } from "react";
    import ThemeButton from "../icons etc/ThemeButton.jsx";
    import IconFactory from "../icons etc/IconFactory.jsx";
    import { Link } from "react-router-dom";
    import SPORTS from "../../../../config.js";
    import SearchComponent from "./SearchComponent.jsx";
    import formatLeaguePath from "../formatLeaguePath.jsx";

    export default function Navbar({ leaguesData, errors, loading }) {
        const [openDropdown, setOpenDropdown] = useState(null);
        const navbarRef = useRef(null);

        // Close dropdown when clicking outside
        useEffect(() => {
            const handleClickOutside = (e) => {
                if (openDropdown && navbarRef.current && !navbarRef.current.contains(e.target)) {
                    setOpenDropdown(null);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [openDropdown]);

        const themeComponent = <ThemeButton />;

        const DropdownItem = ({ item, leagues = [], error = null, isMobile = false }) => {
            const isOpen = openDropdown === item.key;

            const handleToggle = (e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpenDropdown(isOpen ? null : item.key);
            };

            return (
                <li className="center">
                    <details open={isOpen} onClick={handleToggle}>
                        <summary
                            className="cursor-pointer container items-center gap-4  justify-items-start"
                            onClick={(e) => isMobile && e.stopPropagation()}
                        >
                            {item.name}
                            <IconFactory
                                name={item.icon}
                                className={`inline-block ${isMobile ? "w-4 h-4" : "w-6 h-6"} ml-2 stroke-current`}
                            />
                        </summary>

                        <ul
                            className={`p-2 ${
                                isMobile ? "w-full text-md" : "absolute bg-base-100 text-md rounded shadow-md z-20 mt-1"
                            }`}
                        >
                            {loading && (
                                <li className="text-md">
                                    Laddar<span className="loading loading-dots loading-xs" />
                                </li>
                            )}
                            {error && <li className="text-red-500 text-md">Error loading leagues</li>}
                            {!loading &&
                                !error &&
                                leagues.map((l) => (
                                    <li key={l.id}>
                                        <Link
                                            to={`/league/${formatLeaguePath(l.name)}/${l.teamClass.toLowerCase()}`}
                                            onClick={() => setOpenDropdown(null)}
                                            className="block px-2 py-1 hover:bg-base-200 rounded text-md"
                                        >
                                            {l.name}{" "}
                                            {l.name.includes("Superligan")
                                                ? l.teamClass.includes("WOMEN")
                                                    ? "(Dam)"
                                                    : "(Herr)"
                                                : ""}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </details>
                </li>
            );
        };

        return (
            <div ref={navbarRef} className="navbar bg-base-100 shadow-sm relative">
                {/* Navbar start */}
                <div className="navbar-start flex items-center gap-2">
                    {/* Mobile hamburger menu */}
                    <div className="dropdown lg:hidden">
                        <button className="btn btn-ghost" type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <ul
                            className="menu dropdown-content bg-base-100 z-20 w-52 text-md shadow"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {SPORTS.map((item) => (
                                <DropdownItem
                                    key={item.key}
                                    item={item}
                                    leagues={leaguesData[item.leagueKey]}
                                    error={errors[item.leagueKey]}
                                    isMobile
                                />
                            ))}
                            <li className="text-md font-semibold">
                                <button onClick={() => document.getElementById("searchModal").showModal()}>
                                    Sök på lag/ligor
                                </button>
                            </li>
                            <li>{themeComponent}</li>
                        </ul>
                    </div>

                    {/* Desktop menu */}
                    <ul className="menu menu-horizontal flex-nowrap  hidden mx-auto text-lg lg:flex">
                        {SPORTS.map((item) => (
                            <DropdownItem
                                key={item.key}
                                item={item}
                                leagues={leaguesData[item.leagueKey]}
                                error={errors[item.leagueKey]}
                            />
                        ))}
                    </ul>
                </div>

                {/* Navbar center */}
                <div className="navbar-center">
                    <Link to="/" className="btn btn-ghost text-4xl text-center">
                        SportHub
                    </Link>
                </div>

                {/* Navbar end */}
                <div className="navbar-end flex">
                    {/* Mobile search */}
                    <div className="lg:hidden ">
                        <button
                            className="btn btn-ghost"
                            onClick={() => document.getElementById("searchModal").showModal()}
                        >
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.3-4.3" />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop search + theme */}
                    <div className="hidden lg:flex items-center gap-2">
                        <SearchComponent />
                        {themeComponent}
                    </div>
                </div>

                {/* Mobile search modal */}
                <dialog id="searchModal" className="modal modal-top">
                    <div className="modal-box overflow-visible">
                        <div className="flex items-center gap-2">
                            <SearchComponent />
                            <form method="dialog">
                                <button className="btn btn-warning">Stäng</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        );
    }
