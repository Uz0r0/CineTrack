import { NavLink } from "react-router-dom";
import { NAVLINKS, MEDIAS } from "../constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-900 pt-12 pb-6">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <img src="Logo.png" alt="logo" className="w-6 h-6" />
              <p className="text-xl font-bold tracking-tighter">
                CINE<span className="text-brand-primary">TRACK</span>
              </p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-sans">
              Explore, discover, and organize your cinematic journey.
            </p>
          </div>

          <div className="flex gap-15 md:gap-30">
            <div className="flex flex-col gap-3">
              <h4 className="text-brand-primary uppercase tracking-widest text-sm mb-2">
                Navigation
              </h4>
              {NAVLINKS.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  className="text-gray-400 hover:text-white uppercase transition-colors text-sm"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-brand-primary uppercase tracking-widest text-sm mb-2">
                Connect
              </h4>
              {MEDIAS.map((media) => (
                <a
                  key={media.name}
                  href={media.link}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {media.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-6">
          <p className="text-gray-500 text-xs">
            © {currentYear} Cinetrack. Made by Uz0r0
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;