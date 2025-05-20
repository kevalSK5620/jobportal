import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
    savedJobs: [],
  },
  reducers: {
    // Set all jobs
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },

    // Set single job
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },

    // Set admin jobs
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },

    // Set search input
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },

    // Set applied jobs
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },

    // Set query
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },

    // Add job to saved list with safety check
    addSavedJob: (state, action) => {
      if (!Array.isArray(state.savedJobs)) {
        state.savedJobs = [];
      }

      const alreadySaved = state.savedJobs.some(
        (job) => job._id === action.payload._id
      );

      if (!alreadySaved) {
        state.savedJobs.push(action.payload);
      }
    },

    // Remove job from saved list with safety check
    removeSavedJob: (state, action) => {
      if (!Array.isArray(state.savedJobs)) {
        state.savedJobs = [];
      }

      state.savedJobs = state.savedJobs.filter(
        (job) => job._id !== action.payload
      );
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  addSavedJob,
  removeSavedJob,
} = jobSlice.actions;

export default jobSlice.reducer;
