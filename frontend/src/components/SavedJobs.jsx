import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSavedJob } from '../redux/jobSlice';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const SavedJobs = () => {
  const savedJobs = useSelector(state => state.job.savedJobs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6">Saved Jobs</h1>
      {savedJobs.length === 0 ? (
        <p className="text-gray-500">You have not saved any jobs yet.</p>
      ) : (
        <div className="grid gap-4">
          {savedJobs.map(job => (
            <div key={job._id} className="p-4 border rounded shadow bg-white flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-semibold text-lg">{job.title}</h2>
                <p className="text-gray-600">{job.company?.name}</p>
                <p className="text-gray-500 text-sm">{job.description}</p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="outline" onClick={() => navigate(`/description/${job._id}`)}>Details</Button>
                <Button variant="destructive" onClick={() => dispatch(removeSavedJob(job._id))}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs; 