import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import axios from 'axios';
import "../assets/ReferralSubmission.css"; 

const ReferralSubmission = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    candidateLinkedIn: '',
    currentCompany: '',
    currentPosition: '',
    yearsOfExperience: '',
    relationshipToReferrer: '',
    additionalNotes: '',
    resumeFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        resumeFile: e.target.files[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value);
        }
      });

      await axios.post('/api/referrals', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/referrals');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit referral');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <div className="header">
          <UserPlus className="icon" />
          <h2>Submit a Referral</h2>
          <p>Help us find great talent by referring someone you know</p>
        </div>

        {success ? (
          <div className="success-message">
            <p>Referral submitted successfully!</p>
            <p>Redirecting to referrals page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-section">
              <h3>Candidate Information</h3>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="candidateName"
                  required
                  value={formData.candidateName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="candidateEmail"
                  required
                  value={formData.candidateEmail}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="button-group">
              <button type="button" onClick={() => navigate('/referrals')} className="cancel-button">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="submit-button">
                {loading ? 'Submitting...' : 'Submit Referral'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReferralSubmission;
