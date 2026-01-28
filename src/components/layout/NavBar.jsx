import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, BookOpen, Calendar, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '@/assets/logo.svg';

const navLinks = [
  { to: '/', label: 'Hem', icon: BookOpen },
  { to: '/education', label: 'Lärosäten', icon: GraduationCap },
  { to: '/education/events', label: 'Utbildningar', icon: Calendar },
];

export default function NavBar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }

    return location.pathname === path;
  };


  return (
      <nav className="container mx-auto max-w-6xl px-4">
        <div className="navbar bg-base-100 shadow-sm">
          {/* Left */}
          <div className="navbar-start">
            <button
                className="btn btn-ghost lg:hidden"
                onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link to="/" className="btn btn-ghost h-auto py-1">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                  <li key={to}>
                    <Link
                        to={to}
                        className={isActive(to) ? 'active bg-primary text-primary-content' : ''}
                    >
                      <Icon size={16} />
                      {label}
                    </Link>
                  </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="navbar-end">
            <input
                type="text"
                placeholder="Sök"
                className="input input-bordered w-24 md:w-auto"
            />
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
            <div className="lg:hidden bg-base-100 shadow rounded-box mt-2">
              <ul className="menu p-2">
                {navLinks.map(({ to, label, icon: Icon }) => (
                    <li key={to}>
                      <Link
                          to={to}
                          onClick={() => setMobileOpen(false)}
                          className={isActive(to) ? 'active font-semibold' : ''}
                      >
                        <Icon size={16} />
                        {label}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>
        )}
      </nav>
  );
}
