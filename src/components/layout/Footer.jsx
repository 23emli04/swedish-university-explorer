import { Link } from 'react-router-dom';
import { GraduationCap, Github, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 border-t border-base-300 mt-auto">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="bg-primary text-primary-content p-2 rounded-lg">
                <GraduationCap size={20} />
              </div>
              <span>EduPortal</span>
            </Link>
            <p className="text-base-content/60 text-sm leading-relaxed">
              En katalog över svenska lärosäten och utbildningar. 
              Data hämtas från officiella källor.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider opacity-60">Snabblänkar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-base-content/80 hover:text-primary transition-colors text-sm">
                  Hem
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-base-content/80 hover:text-primary transition-colors text-sm">
                  Lärosäten
                </Link>
              </li>
              <li>
                <Link to="/education/events" className="text-base-content/80 hover:text-primary transition-colors text-sm">
                  Utbildningar
                </Link>
              </li>
            </ul>
          </div>

          {/* External Resources */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider opacity-60">Resurser</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.studera.nu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-base-content/80 hover:text-primary transition-colors text-sm"
                >
                  Studera.nu <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.antagning.se" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-base-content/80 hover:text-primary transition-colors text-sm"
                >
                  Antagning.se <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-base-300 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-base-content/50">
            © {currentYear} EduPortal. Alla rättigheter förbehållna.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="mailto:kontakt@example.com" 
              className="text-base-content/50 hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-base-content/50 hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
