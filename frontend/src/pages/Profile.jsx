import React from 'react';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Star, Code, Globe, Coffee, Heart } from 'lucide-react';
import  "../assets/Profile.css";
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Skills = {
  "Frontend Development": ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
  "Backend Development": ["Node.js", "Python", "Django", "GraphQL", "PostgreSQL"],
  "DevOps & Tools": ["Docker", "Kubernetes", "AWS", "CI/CD", "Git"],
}

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        
        {/* Header Section */}
        <div className="profile-header">
          <div className="badge-container">
            <span className="badge green-badge">
              <Coffee className="icon-small" /> Available for work
            </span>
            <span className="badge blue-badge">
              <Globe className="icon-small" /> Remote friendly
            </span>
          </div>
          <div className="profile-header-content">
            <div className="profile-image-container">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                alt="Profile"
                className="profile-image"
              />
              <div className="star-icon">
                <Star className="icon-medium" />
              </div>
            </div>
            <div className="profile-info">
              <h1 className="profile-name">John Doe</h1>
              <p className="profile-title">Senior Software Engineer</p>
              <div className="contact-info">
                <div className="contact-item">
                  <Mail className="icon-small" /> <span>john.doe@example.com</span>
                </div>
                <div className="contact-item">
                  <Phone className="icon-small" /> <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <MapPin className="icon-small" /> <span>San Francisco, CA</span>
                </div>
              </div>
              <div className="social-links">
                <a href="https://github.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="icon-medium" />
                </a>
                <a href="https://linkedin.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="icon-medium" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div className="section">
          <div className="section-header">
            <User className="icon-medium section-icon" />
            <h2>About Me</h2>
          </div>
          <p className="section-text">
            Experienced software engineer with 8+ years of expertise in full-stack development.
            Passionate about creating scalable solutions and mentoring junior developers.
            Strong focus on clean code and best practices.
          </p>
          <div className="interest">
            <Heart className="icon-small heart-icon" />
            <span>Loves solving complex problems and building great user experiences</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="tech-section">
          <div className="section-header">
            <div className="icon-container">
              <Code className="icon-medium " />
            </div>
              <h2>Technical Arsenal</h2>
          </div>
          {Object.entries(Skills).map(([category, skills]) => (
            <div key={category} className="skill-category">
              <h3>{category}</h3>
              <div className="skills">
                {skills.map((skill) => (
                  <span key={skill} className={`skill-tag ${category.split(" ")[0].toLowerCase()}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <div className="section">
          <div className="section-header">
            <Briefcase className="icon-medium section-icon" />
            <h2>Professional Journey</h2>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-icon"></div>
              <div className="timeline-content">
                <h3>Senior Software Engineer</h3>
                <p className="timeline-subtext">Tech Corp • 2020 - Present</p>
                <ul className="timeline-list">
                  <li><Star className="icon-small" /> Led microservices development</li>
                  <li><Star className="icon-small" /> Mentored junior developers</li>
                  <li><Star className="icon-small" /> Improved system performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
