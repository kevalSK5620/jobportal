import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const VerifyOTP = () => {
    const [loading, setLoading] = useState(false);
    const [otp, setOTP] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    // Redirect to forgot password if no email
    if (!email) {
        navigate('/forgot-password');
        return null;
    }

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (otp.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }

        // If OTP is valid, navigate to reset password page
        navigate('/reset-password', { state: { email, otp } });
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={handleVerifyOTP} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Verify OTP</h1>
                    <p className='text-gray-500 mb-4'>Enter the verification code sent to {email}</p>

                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={email}
                            disabled
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Verification Code</Label>
                        <Input
                            type="text"
                            value={otp}
                            onChange={(e) => setOTP(e.target.value)}
                            placeholder="Enter 6-digit code"
                            maxLength={6}
                            required
                        />
                    </div>

                    {loading ? (
                        <Button className="w-full my-4" disabled>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">
                            Verify Code
                        </Button>
                    )}

                    <div className='flex justify-between text-sm'>
                        <Link to="/login" className='text-blue-600'>Back to Login</Link>
                        <Link to="/forgot-password" className='text-blue-600'>Change Email</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default VerifyOTP 