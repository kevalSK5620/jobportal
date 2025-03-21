import React, { useState } from "react";
import { Search, Briefcase, MapPin, Filter, Clock } from 'lucide-react';
import "../assets/jobs.css";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "Ahmedabad, GJ",
    type: "Full-time",
    salary: "₹120k - ₹150k",
    posted: "2 days ago",
    logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=128&h=128&fit=crop",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Design Masters",
    location: "Remote",
    type: "Contract",
    salary: "₹80k - ₹100k",
    posted: "1 day ago",
    logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=128&h=128&fit=crop",
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "Cloud Systems Inc",
    location: "Mehsana, GJ",
    type: "Full-time",
    salary: "₹130k - ₹160k",
    posted: "3 days ago",
    logo: "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?w=128&h=128&fit=crop",
  },
];

// Custom Rupee Icon component
const RupeeIcon = () => (
  <span className="rupee-icon">₹</span>
);

function JobBoard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || job.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="job-board-container">
      {/* Main Content */}
      <main className="job-board-content">
        {/* Search and Filter Section */}
        <div className="job-search-filter">
          <div className="job-search-box">
            <Search className="job-icon" />
            <input
              type="text"
              placeholder="Search jobs or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="job-filter-box">
            <Filter className="job-icon" />
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option>All</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Remote</option>
            </select>
          </div>
        </div>

        {/* Job Listings */}
        <div className="job-listings">
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-card-box">
              <img src={job.logo || "/placeholder.svg"} alt={`${job.company} logo`} className="job-card-logo" />
              <div className="job-card-info">
                <div className="job-card-header">
                  <div>
                    <h2>{job.title}</h2>
                    <p className="job-card-company">{job.company}</p>
                  </div>
                  <button className="job-apply-button">Apply Now</button>
                </div>
                <div className="job-card-details">
                  <p><MapPin className="job-icon" /> {job.location}</p>
                  <p><Briefcase className="job-icon" /> {job.type}</p>
                  <p><RupeeIcon /> {job.salary.substring(1)}</p>
                  <p><Clock className="job-icon" /> {job.posted}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default JobBoard;
