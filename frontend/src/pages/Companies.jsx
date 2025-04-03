import React from 'react';
import { Building2, Users, Globe, TrendingUp, ArrowRight } from 'lucide-react';
import "../assets/Companies.css";

const companies = [
  {
    name: "TechCorp Global",
    industry: "Technology",
    employees: "1000+",
    location: "San Francisco, CA",
    growth: "+45% YoY",
    image: "https://images.unsplash.com/photo-1496200186974-4293800e2c20?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "EcoSolutions",
    industry: "Sustainability",
    employees: "500+",
    location: "Portland, OR",
    growth: "+32% YoY",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "HealthFirst",
    industry: "Healthcare",
    employees: "2000+",
    location: "Boston, MA",
    growth: "+28% YoY",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "FinTech Plus",
    industry: "Finance",
    employees: "750+",
    location: "New York, NY",
    growth: "+38% YoY",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "AI Dynamics",
    industry: "Artificial Intelligence",
    employees: "300+",
    location: "Seattle, WA",
    growth: "+52% YoY",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "BioTech Innovations",
    industry: "Biotechnology",
    employees: "800+",
    location: "Cambridge, MA",
    growth: "+41% YoY",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Green Energy Co",
    industry: "Renewable Energy",
    employees: "1200+",
    location: "Austin, TX",
    growth: "+35% YoY",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Smart Mobility",
    industry: "Transportation",
    employees: "600+",
    location: "Detroit, MI",
    growth: "+29% YoY",
    image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "EdTech Solutions",
    industry: "Education",
    employees: "400+",
    location: "Chicago, IL",
    growth: "+33% YoY",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Quantum Computing Ltd",
    industry: "Computing",
    employees: "250+",
    location: "Boulder, CO",
    growth: "+48% YoY",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "AgriTech Solutions",
    industry: "Agriculture",
    employees: "900+",
    location: "Des Moines, IA",
    growth: "+27% YoY",
    image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "CyberSec Pro",
    industry: "Cybersecurity",
    employees: "450+",
    location: "Arlington, VA",
    growth: "+44% YoY",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "SpaceTech Ventures",
    industry: "Aerospace",
    employees: "700+",
    location: "Houston, TX",
    growth: "+39% YoY",
    image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Robotics Advanced",
    industry: "Robotics",
    employees: "350+",
    location: "Pittsburgh, PA",
    growth: "+42% YoY",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "CloudScale Systems",
    industry: "Cloud Computing",
    employees: "850+",
    location: "Raleigh, NC",
    growth: "+37% YoY",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80"
  },
  {
    name: "Digital Health Co",
    industry: "Digital Health",
    employees: "550+",
    location: "Minneapolis, MN",
    growth: "+31% YoY",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80"
  }
];

const Companies = () => {
  return (
    <div className="companies-container">
      <div className="companies-wrapper">
        <div className="companies-header">
          <h1>Leading Companies Trust Us</h1>
          <p>Partner with industry leaders who are transforming their sectors</p>
        </div>

        <div className="companies-grid">
          {companies.map((company, index) => (
            <div key={index} className="company-card">
              <div className="company-image">
                <img src={company.image} alt={company.name} />
              </div>
              
              <div className="company-content">
                <h3>{company.name}</h3>
                
                <div className="company-details">
                  <div className="detail-item">
                    <Building2 className="icon" />
                    <span>{company.industry}</span>
                  </div>
                  
                  <div className="detail-item">
                    <Users className="icon" />
                    <span>{company.employees}</span>
                  </div>
                  
                  <div className="detail-item">
                    <Globe className="icon" />
                    <span>{company.location}</span>
                  </div>
                  
                  <div className="detail-item growth">
                    <TrendingUp className="icon" />
                    <span>{company.growth}</span>
                  </div>
                </div>
                
                <button className="learn-more-btn">
                  <span>Learn More</span>
                  <ArrowRight className="arrow-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;