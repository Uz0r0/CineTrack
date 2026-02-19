import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { NAVLINKS } from "../constants";
import SearchModal from "./SearchModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  return (
    <>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <header className="relative flex items-center justify-between px-6 py-4 md:px-12 z-50">
        <div className="flex items-center gap-2 z-50">
          <img src="Logo.png" alt="logo" className="w-8 h-8 md:w-10 md:h-10" />
          <p className="text-xl md:text-2xl font-bold tracking-tighter">
            CINE<span className="text-brand-primary">TRACK</span>
          </p>
        </div>

        <nav className="hidden md:flex gap-8">
          {NAVLINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-semibold uppercase tracking-widest transition-color duration-300 ${
                  isActive && "text-brand-primary"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4 z-50">
          <button onClick={() => setIsSearchOpen(true)}>
            <Search className="w-5 h-5 cursor-pointer hover:text-brand-primary transition-colors" />
          </button>
          
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div
          className={`
        fixed inset-0 bg-black flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
        >
          {NAVLINKS.map((link) => (
            <NavLink
              key={link.label}
              onClick={() => setIsOpen(false)}
              to={link.path}
              className={({ isActive }) =>
                `text-2xl font-bold uppercase tracking-widest ${
                  isActive && "text-brand-primary"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </header>
    </>
  );
};

export default Navbar;
