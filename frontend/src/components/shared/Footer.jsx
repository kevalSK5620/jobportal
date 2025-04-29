import React from 'react';
import { Briefcase, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <div className="flex items-center mb-4">
              <Briefcase className="h-6 w-6 text-teal-400" />
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
                JobBoard
              </span>
            </div>
            <p className="text-indigo-100 mb-4">
              Connecting talented professionals with innovative companies since 2020.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-indigo-200 hover:text-teal-300 transition-colors duration-300 transform hover:-translate-y-1">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-indigo-200 hover:text-teal-300 transition-colors duration-300 transform hover:-translate-y-1">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-indigo-200 hover:text-teal-300 transition-colors duration-300 transform hover:-translate-y-1">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-indigo-200 hover:text-teal-300 transition-colors duration-300 transform hover:-translate-y-1">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-teal-300">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-indigo-100 hover:text-teal-300 transition-colors hover:pl-1 duration-300 flex items-center">
                  <span className="w-1 h-1 bg-teal-300 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-indigo-100 hover:text-teal-300 transition-colors hover:pl-1 duration-300 flex items-center">
                  <span className="w-1 h-1 bg-teal-300 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-indigo-100 hover:text-teal-300 transition-colors hover:pl-1 duration-300 flex items-center">
                  <span className="w-1 h-1 bg-teal-300 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-indigo-100 hover:text-teal-300 transition-colors hover:pl-1 duration-300 flex items-center">
                  <span className="w-1 h-1 bg-teal-300 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-indigo-100 hover:text-teal-300 transition-colors hover:pl-1 duration-300 flex items-center">
                  <span className="w-1 h-1 bg-teal-300 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-teal-300">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/resources/resume-tips" className="text-indigo-100 hover:text-teal-300 transition-colors hover:pl-1 duration-300 flex items-center">
                  <span className="w-1 h-1 bg-teal-300 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Resume Tips
                </Link>
              </li>
              <li>
                <Link to="/resources/interview-prep" className="text-indigo-100 hover:text-teal-300 transition-colors hover:pl-1 duration-300 flex items-center">
                  <span className="w-1 h-1 bg-teal-300 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Interview Prep
                </Link>
              </li>
              <li>
                <Link to="/resources/career-advice" className="text-indigo-100 hover:text-teal-300 transition-colors hover:pl-1 duration-300 flex items-center">
                  <span className="w-1 h-1 bg-teal-300 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Career Advice
                </Link>
              </li>
              <li>
                <Link to="/resources/salary-guide" className="text-indigo-100 hover:text-teal-300 transition-colors hover:pl-1 duration-300 flex items-center">
                  <span className="w-1 h-1 bg-teal-300 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Salary Guide
                </Link>
              </li>
              <li>
                <Link to="/resources/remote-work" className="text-indigo-100 hover:text-teal-300 transition-colors hover:pl-1 duration-300 flex items-center">
                  <span className="w-1 h-1 bg-teal-300 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Remote Work
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-teal-300">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-center text-indigo-100 hover:text-teal-300 transition-colors duration-300">
                <Mail className="h-5 w-5 mr-2 text-teal-300" />
                support@jobboard.com
              </p>
              <p className="text-indigo-100">
                123 Job Street, <br />
                San Francisco, CA 94107
              </p>
              <Link 
                to="/contact" 
                className="inline-block border border-teal-400 rounded-md px-4 py-2 text-teal-300 hover:bg-teal-500/10 transition-colors mt-2
                hover:shadow-lg hover:shadow-teal-500/20 hover:border-teal-300"
              >
                Send Message
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-indigo-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-indigo-200 text-sm">
          <p>&copy; 2025 JobBoard. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <Link to="/privacy" className="hover:text-teal-300 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-teal-300 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-teal-300 transition-colors duration-300">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;