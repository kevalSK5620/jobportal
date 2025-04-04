import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import Jobs from "./pages/Jobs";
import Companies from "./pages/Companies";
import Profile from "./pages/Profile";
import Footer from './Components/Footer';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import Admin from './admin/Admin';
import Notifications from "./pages/Notifications";
import ReferralSubmission from "./pages/ReferralSubmission";

const Layout = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup","/forgotpassword","/admin"].includes(location.pathname);
  const hideFooter = ["/login","/signup","/forgotpassword","/admin"].includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet />
      {!hideFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="companies" element={<Companies />} />
            <Route path="profile" element={<Profile />} />
            <Route path="footer" element={<Footer />} />
            <Route path="ForgotPassword" element={<ForgotPassword />} />
            <Route path="verify-otp" element={<VerifyOTP />} />
            <Route path="admin" element={<Admin />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="referralsubmission" element={<ReferralSubmission />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;