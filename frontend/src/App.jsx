import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import RequestOTP from './components/auth/RequestOTP'
import VerifyOTP from './components/auth/VerifyOTP'
import ResetPassword from './components/auth/ResetPassword'
import Navbar from './components/shared/Navbar'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<RequestOTP />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/description/:id" element={<JobDescription />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/companies" element={<ProtectedRoute><Companies/></ProtectedRoute>} />
        <Route path="/admin/companies/create" element={<ProtectedRoute><CompanyCreate/></ProtectedRoute>} />
        <Route path="/admin/companies/:id" element={<ProtectedRoute><CompanySetup/></ProtectedRoute>} />
        <Route path="/admin/jobs" element={<ProtectedRoute><AdminJobs/></ProtectedRoute>} />
        <Route path="/admin/jobs/create" element={<ProtectedRoute><PostJob/></ProtectedRoute>} />
        <Route path="/admin/jobs/:id/applicants" element={<ProtectedRoute><Applicants/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
