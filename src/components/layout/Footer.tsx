
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary/50 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">academia<span className="text-primary">aligner</span></h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Finding your perfect college match through sophisticated algorithms and personalized recommendations.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground transitions-all">Home</Link></li>
              <li><Link to="/results" className="text-sm text-muted-foreground hover:text-foreground transitions-all">College Matches</Link></li>
              <li><Link to="#about" className="text-sm text-muted-foreground hover:text-foreground transitions-all">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">contact@academiaaligner.com</li>
              <li className="text-sm text-muted-foreground">1234 University Ave.</li>
              <li className="text-sm text-muted-foreground">College Town, USA</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Academia Aligner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
