import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { email, otp } = location.state || {};

    const [input, setInput] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    // Redirect to forgot password if no email or OTP
    if (!email || !otp) {
        navigate('/forgot-password');
        return null;
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        
        if (input.newPassword !== input.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (input.newPassword.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/auth/reset-password`, {
                email,
                otp,
                newPassword: input.newPassword
            });
            
            if (res.data.success) {
                toast.success("Password reset successful");
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={handleResetPassword} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Set New Password</h1>
                    <p className='text-gray-500 mb-4'>Create a new password for your account</p>

                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={email}
                            disabled
                        />
                    </div>

                    <div className='my-2'>
                        <Label>New Password</Label>
                        <Input
                            type="password"
                            name="newPassword"
                            value={input.newPassword}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            required
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Confirm Password</Label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            value={input.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm new password"
                            required
                        />
                    </div>

                    {loading ? (
                        <Button className="w-full my-4" disabled>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">
                            Reset Password
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

export default ResetPassword 