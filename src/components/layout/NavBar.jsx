import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, BookOpen, Calendar, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { to: '/', label: 'Hem', icon: BookOpen },
  { to: '/education', label: 'Lärosäten', icon: GraduationCap },
  { to: '/education/events', label: 'Utbildningar', icon: Calendar },
];

export default function NavBar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-md border-b border-base-300">
      <nav className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
            <div className="bg-primary text-primary-content p-2 rounded-lg">
              <GraduationCap size={24} />
            </div>
            <span className="hidden sm:inline">EduPortal</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive(to)
                      ? 'bg-primary text-primary-content'
                      : 'hover:bg-base-200 text-base-content/80 hover:text-base-content'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <button
            className="md:hidden btn btn-ghost btn-square"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-base-300 mt-2 pt-4">
            <ul className="flex flex-col gap-2">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      isActive(to)
                        ? 'bg-primary text-primary-content'
                        : 'hover:bg-base-200 text-base-content/80'
                    }`}
                  >
                    <Icon size={20} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
