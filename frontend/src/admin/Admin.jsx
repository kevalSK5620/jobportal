import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  BarChart3,
  Settings,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
} from 'lucide-react';
import '../assets/admin.css'

function App() {
  const [activeTab, setActiveTab] = useState('jobs');
  
  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      applicants: 45,
      status: 'Active',
      posted: '2024-02-15',
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'New York',
      applicants: 32,
      status: 'Active',
      posted: '2024-02-14',
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'San Francisco',
      applicants: 28,
      status: 'Closed',
      posted: '2024-02-10',
    },
  ];

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <Briefcase className="icon" />
          <h1>JobPortal</h1>
        </div>
        
        <nav>
          <button
            className={activeTab === 'jobs' ? 'active' : ''}
            onClick={() => setActiveTab('jobs')}
          >
            <Briefcase className="icon" /> Jobs
          </button>
          <button
            className={activeTab === 'applicants' ? 'active' : ''}
            onClick={() => setActiveTab('applicants')}
          >
            <Users className="icon" /> Applicants
          </button>
          <button
            className={activeTab === 'analytics' ? 'active' : ''}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 className="icon" /> Analytics
          </button>
          <button
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="icon" /> Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="content">
        <div className="header">
          <div>
            <h2>Jobs</h2>
            <p>Manage all job postings and applications</p>
          </div>
          <button className="btn">
            <Plus className="icon" /> Post New Job
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <Search className="search-icon" />
          <input type="text" placeholder="Search jobs..." />
        </div>

        {/* Jobs Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Department</th>
                <th>Location</th>
                <th>Applicants</th>
                <th>Status</th>
                <th>Posted Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.department}</td>
                  <td>{job.location}</td>
                  <td>{job.applicants}</td>
                  <td className={job.status === 'Active' ? 'active-status' : 'closed-status'}>
                    {job.status}
                  </td>
                  <td>{job.posted}</td>
                  <td>
                    <button className="icon-btn"><Edit className="icon" /></button>
                    <button className="icon-btn"><Trash2 className="icon" /></button>
                    <button className="icon-btn"><MoreVertical className="icon" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
