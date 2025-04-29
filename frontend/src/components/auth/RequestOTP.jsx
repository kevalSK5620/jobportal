import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const RequestOTP = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/auth/forgot-password`, { email });
            if (res.data.success) {
                toast.success("OTP sent to your email");
                // Navigate to OTP verification page with email
                navigate('/verify-otp', { state: { email } });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={handleRequestOTP} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Forgot Password</h1>
                    <p className='text-gray-500 mb-4'>Enter your email address to receive a verification code.</p>
                    
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {loading ? (
                        <Button className="w-full my-4" disabled>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">
                            Send Verification Code
                        </Button>
                    )}

                    <div className='flex justify-between text-sm'>
                        <Link to="/login" className='text-blue-600'>Back to Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RequestOTP 