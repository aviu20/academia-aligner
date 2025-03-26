
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass dark:glass-dark transitions-all">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-medium tracking-tight text-foreground transitions-all hover:opacity-80"
        >
          academia<span className="text-primary font-semibold">aligner</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/results">Matches</NavLink>
          <NavLink to="#about">About</NavLink>
        </nav>
        
        <div className="md:hidden">
          {/* Mobile menu button - for simplicity not implementing mobile menu in this version */}
          <button className="p-2 rounded-full hover:bg-secondary transitions-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, className }) => {
  const isActive = window.location.pathname === to;
  
  return (
    <Link
      to={to}
      className={cn(
        "font-medium transitions-all relative text-foreground/80 hover:text-foreground",
        isActive && "text-primary hover:text-primary/90",
        className
      )}
    >
      {children}
      <span 
        className={cn(
          "absolute -bottom-1 left-0 h-0.5 bg-primary transitions-all",
          isActive ? "w-full" : "w-0 group-hover:w-full"
        )}
      />
    </Link>
  );
};

export default Header;
