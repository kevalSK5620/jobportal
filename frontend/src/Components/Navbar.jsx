import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "../assets/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        JobPortal
      </Link>

      {/* Mobile Menu Toggle */}
      <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Menu */}
      <div className="navbar-links">
        <Link to="/jobs">Jobs</Link>
        <Link to="/companies">Companies</Link>
        <Link to="/profile">Profile</Link>
      </div>

      {/* Auth Buttons */}
      <div className="auth-buttons">
        <Link to="/login" className="login-btn">Login</Link>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <Link to="/jobs" onClick={() => setIsOpen(false)}>Jobs</Link>
          <Link to="/companies" onClick={() => setIsOpen(false)}>Companies</Link>
          <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
          <Link to="/login" className="login-btn" onClick={() => setIsOpen(false)}>Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
