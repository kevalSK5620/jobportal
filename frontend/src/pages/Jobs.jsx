import React, { useState } from "react";
import PropTypes from "prop-types";
import { Search, Briefcase, MapPin, Filter, Clock } from "lucide-react";
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

const RupeeIcon = () => <span className="rupee-icon">₹</span>;

export default function JobBoard() {
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
              className="job-search-input"
            />
          </div>

          <div className="job-filter-box">
            <Filter className="job-icon" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="job-filter-select"
            >
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
          {filteredJobs.length === 0 ? (
            <div className="no-jobs-found">
              <p>No jobs found matching your criteria</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.id} className="job-card-box">
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  className="job-card-logo"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/128?text=Company";
                  }}
                />
                <div className="job-card-info">
                  <div className="job-card-header">
                    <div>
                      <h2 className="job-title">{job.title}</h2>
                      <p className="job-card-company">{job.company}</p>
                    </div>
                    <button className="job-apply-button">Apply Now</button>
                  </div>
                  <div className="job-card-details">
                    <span className="job-detail">
                      <MapPin className="job-icon" /> {job.location}
                    </span>
                    <span className="job-detail">
                      <Briefcase className="job-icon" /> {job.type}
                    </span>
                    <span className="job-detail">
                      <RupeeIcon /> {job.salary.substring(1)}
                    </span>
                    <span className="job-detail">
                      <Clock className="job-icon" /> {job.posted}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

// PropTypes for type validation
JobBoard.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      salary: PropTypes.string.isRequired,
      posted: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
    })
  ),
};
