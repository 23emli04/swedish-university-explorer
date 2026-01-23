import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center gap-4 bg-base-300/50 text-base-content rounded p-6 glass">
            <aside className="w-36">
                <img src="/logo.png" alt="Sporthubs logga" className="rounded-lg" />
            </aside>

            <nav className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-center">
                <Link to="/about-us" className="link link-hover">
                    Om oss
                </Link>
            </nav>
            <aside>
                <p className="text-xs text-center">
                    © {new Date().getFullYear()} SportHub — Alla rättigheter förbehållna
                </p>
            </aside>
        </footer>
    );
}
