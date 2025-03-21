import React from "react";
import { Briefcase, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import "../assets/footer.css"; // Ensure this file exists

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-brand">
              <Briefcase className="footer-icon" />
              <span className="footer-title">JobPortal</span>
            </div>
            <p className="footer-text">
              Connecting talented professionals with outstanding opportunities. Your career journey starts here.
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon"><Facebook /></a>
              <a href="#" className="social-icon"><Twitter /></a>
              <a href="#" className="social-icon"><Linkedin /></a>
              <a href="#" className="social-icon"><Instagram /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              {["Find Jobs", "Browse Companies", "Salary Calculator", "Career Resources", "Resume Builder", "Job Alerts"].map((item) => (
                <li key={item}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div className="footer-section">
            <h3 className="footer-heading">For Employers</h3>
            <ul className="footer-links">
              {["Post a Job", "Browse Resumes", "Recruitment Solutions", "Pricing Plans", "Employer Resources", "Advertise with Us"].map((item) => (
                <li key={item}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-contact">
              <li><MapPin className="contact-icon" /> 123 Business Ave, San Francisco, CA 94107</li>
              <li><Phone className="contact-icon" /> +1 (555) 123-4567</li>
              <li><Mail className="contact-icon" /> support@jobPortal.com</li>
            </ul>
            <div className="footer-newsletter">
              <h4>Subscribe to our newsletter</h4>
              <form className="newsletter-form">
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div>© {new Date().getFullYear()} JobPortal. All rights reserved.</div>
          <ul className="footer-bottom-links">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map((item) => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
