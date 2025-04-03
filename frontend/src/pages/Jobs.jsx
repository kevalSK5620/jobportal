import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, ChevronRight, Search, Filter } from 'lucide-react';
import "../assets/Jobs.css";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const jobListings = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      posted: "2 days ago",
      description: "We're looking for an experienced Frontend Developer to join our growing team..."
    },
    {
      title: "UX Designer",
      company: "Design Studio",
      location: "Remote",
      type: "Full-time",
      posted: "1 week ago",
      description: "Join our creative team to design beautiful and intuitive user experiences..."
    },
    {
      title: "Backend Engineer",
      company: "StartupX",
      location: "New York, NY",
      type: "Contract",
      posted: "3 days ago",
      description: "Looking for a skilled Backend Engineer to help scale our infrastructure..."
    },
    {
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      location: "Seattle, WA",
      type: "Full-time",
      posted: "5 days ago",
      description: "Join our DevOps team to build and maintain robust cloud infrastructure..."
    },
    {
      title: "Mobile App Developer",
      company: "AppWorks Inc.",
      location: "Los Angeles, CA",
      type: "Part-time",
      posted: "1 day ago",
      description: "Seeking a talented mobile developer to create innovative iOS and Android applications..."
    },
    {
      title: "Data Scientist",
      company: "DataCorp",
      location: "Boston, MA",
      type: "Full-time",
      posted: "4 days ago",
      description: "Looking for a data scientist to analyze complex datasets and build ML models..."
    },
    {
      title: "Product Manager",
      company: "ProductLabs",
      location: "Remote",
      type: "Full-time",
      posted: "1 week ago",
      description: "Join us as a Product Manager to lead our product development initiatives..."
    },
    {
      title: "QA Engineer",
      company: "QualityTech",
      location: "Austin, TX",
      type: "Contract",
      posted: "2 days ago",
      description: "Seeking a detail-oriented QA Engineer to ensure product quality..."
    },
    {
      title: "Blockchain Developer",
      company: "CryptoInnovate",
      location: "Miami, FL",
      type: "Full-time",
      posted: "3 days ago",
      description: "Join our blockchain team to develop cutting-edge decentralized applications..."
    },
    {
      title: "Technical Writer",
      company: "DocuTech",
      location: "Remote",
      type: "Part-time",
      posted: "6 days ago",
      description: "Looking for a technical writer to create comprehensive documentation..."
    },
    {
      title: "Systems Architect",
      company: "ArchitectureNow",
      location: "Chicago, IL",
      type: "Full-time",
      posted: "1 week ago",
      description: "Design and implement scalable system architectures for enterprise applications..."
    },
    {
      title: "AI Research Engineer",
      company: "AILabs",
      location: "San Jose, CA",
      type: "Full-time",
      posted: "4 days ago",
      description: "Research and develop cutting-edge AI solutions for real-world problems..."
    },
    {
      title: "Security Engineer",
      company: "SecureNet",
      location: "Washington, DC",
      type: "Full-time",
      posted: "2 days ago",
      description: "Join our cybersecurity team to protect critical infrastructure..."
    },
    {
      title: "UI Developer",
      company: "DesignWorks",
      location: "Portland, OR",
      type: "Contract",
      posted: "5 days ago",
      description: "Create beautiful and responsive user interfaces for web applications..."
    },
    {
      title: "Cloud Architect",
      company: "CloudSys",
      location: "Denver, CO",
      type: "Full-time",
      posted: "1 week ago",
      description: "Design and implement cloud-native solutions using modern technologies..."
    }
  ];

  const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract'];
  const locations = [
    'All',
    'Remote',
    'San Francisco, CA',
    'New York, NY',
    'Seattle, WA',
    'Boston, MA',
    'Los Angeles, CA',
    'Chicago, IL',
    'Austin, TX',
    'Miami, FL',
    'Denver, CO',
    'Portland, OR',
    'Washington, DC',
    'San Jose, CA',
    'Houston, TX',
    'Phoenix, AZ',
    'Philadelphia, PA',
    'Dallas, TX',
    'San Diego, CA',
    'Atlanta, GA'
  ];

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || job.type === selectedType;
    const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;
    
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="jobs-container">
      <header className="jobs-header">
        <h1>Open Positions</h1>
        <p>Join our team and help build the future</p>
      </header>

      <div className="search-filter-container">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <MapPin size={20} />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="location-select"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="jobs-grid">
        {filteredJobs.map((job, index) => (
          <div key={index} className="job-card">
            <div className="job-card-header">
              <h2>{job.title}</h2>
              <span className="company-name">{job.company}</span>
            </div>
            
            <p className="job-description">{job.description}</p>
            
            <div className="job-meta">
              <div className="meta-item">
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
              <div className="meta-item">
                <Briefcase size={16} />
                <span>{job.type}</span>
              </div>
              <div className="meta-item">
                <Clock size={16} />
                <span>{job.posted}</span>
              </div>
            </div>
            
            <button className="apply-button">
              Apply Now
              <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;