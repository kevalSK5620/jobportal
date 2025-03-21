import { Search, Briefcase, Building2, TrendingUp, Users, Award, ArrowRight } from "lucide-react"
import "../assets/homepage.css"

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80"
            alt="Office background"
            className="hero-bg"
          />
        </div>
        <div className="hero-content">
          <h1>Find Your Dream Job Today</h1>
          <p>Connect with over 10,000+ employers and discover your next career opportunity</p>
          <div className="search-box">
            <div className="search-input">
              <Search className="search-icon" />
              <input type="text" placeholder="Job title or keyword" />
            </div>
            <div className="search-input">
              <Building2 className="search-icon" />
              <input type="text" placeholder="Location" />
            </div>
            <button className="search-button">Search Jobs</button>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="featured-jobs">
        <div className="section-header">
          <h2>Featured Jobs</h2>
          <a href="#">
            View all jobs <ArrowRight className="arrow-icon" />
          </a>
        </div>
        <div className="jobs-grid">
          {[1, 2, 3].map((job) => (
            <div key={job} className="job-card">
              <div className="job-header">
                <div className="job-icon">
                  <Briefcase />
                </div>
                <div>
                  <h3>Senior Developer</h3>
                  <p>Tech Corp Inc.</p>
                </div>
                <span className="job-badge">Full-time</span>
              </div>
              <div className="job-location">
                <Building2 className="location-icon" /> San Francisco, CA
              </div>
              <p className="job-description">Join our team and help build the next generation of web applications...</p>
              <div className="job-footer">
                <span className="job-salary">₹120k - ₹150k</span>
                <button className="apply-button">Apply Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon">
              <Briefcase />
            </div>
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Active Jobs</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <Building2 />
            </div>
            <div className="stat-number">5,000+</div>
            <div className="stat-label">Companies</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <Users />
            </div>
            <div className="stat-number">1M+</div>
            <div className="stat-label">Job Seekers</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <Award />
            </div>
            <div className="stat-number">500k+</div>
            <div className="stat-label">Placements</div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2 className="categories-title">Popular Categories</h2>
        <div className="categories-grid">
          {[
            { icon: <TrendingUp />, title: "Technology", count: "1200 jobs" },
            { icon: <Building2 />, title: "Finance", count: "800 jobs" },
            { icon: <Users />, title: "Marketing", count: "600 jobs" },
            { icon: <Briefcase />, title: "Sales", count: "900 jobs" },
          ].map((category, index) => (
            <div key={index} className="category-card">
              <div className="category-icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <p>{category.count}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home

