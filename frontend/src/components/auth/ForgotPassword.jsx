import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AUTH_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // 1: Email input, 2: OTP and new password
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${AUTH_API_END_POINT}/forgot-password`, { email: input.email });
            if (res.data.success) {
                toast.success("OTP sent to your email");
                setStep(2);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
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

        if (!input.otp) {
            toast.error("Please enter the OTP");
            return;
        }

        try {
            setLoading(true);
            console.log('Sending reset password request:', {
                email: input.email,
                otp: input.otp,
                newPassword: input.newPassword
            });
            
            const res = await axios.post(`${AUTH_API_END_POINT}/reset-password`, {
                email: input.email,
                otp: input.otp.toString(),
                newPassword: input.newPassword
            });

            console.log('Reset password response:', res.data);
            
            if (res.data.success) {
                toast.success("Password reset successful");
                navigate("/login");
            }
        } catch (error) {
            console.error('Reset password error:', error.response || error);
            toast.error(error.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={step === 1 ? handleRequestOTP : handleResetPassword} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Reset Password</h1>
                    
                    {step === 1 ? (
                        <div className='my-2'>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    ) : (
                        <>
                            <div className='my-2'>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    disabled
                                />
                            </div>
                            <div className='my-2'>
                                <Label>Enter OTP</Label>
                                <Input
                                    type="text"
                                    value={input.otp}
                                    name="otp"
                                    onChange={changeEventHandler}
                                    placeholder="Enter OTP sent to your email"
                                    required
                                />
                            </div>
                            <div className='my-2'>
                                <Label>New Password</Label>
                                <Input
                                    type="password"
                                    value={input.newPassword}
                                    name="newPassword"
                                    onChange={changeEventHandler}
                                    placeholder="Enter new password"
                                    required
                                />
                            </div>
                            <div className='my-2'>
                                <Label>Confirm Password</Label>
                                <Input
                                    type="password"
                                    value={input.confirmPassword}
                                    name="confirmPassword"
                                    onChange={changeEventHandler}
                                    placeholder="Confirm new password"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {loading ? (
                        <Button className="w-full my-4" disabled>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">
                            {step === 1 ? 'Send OTP' : 'Reset Password'}
                        </Button>
                    )}

                    <div className='flex justify-between text-sm'>
                        <Link to="/login" className='text-blue-600'>Back to Login</Link>
                        {step === 2 && (
                            <button 
                                type="button" 
                                onClick={() => setStep(1)} 
                                className='text-blue-600'
                            >
                                Change Email
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword 