import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { Badge } from '../ui/badge';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, 
                { status },
                { withCredentials: true }
            );
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update status');
        }
    }

    if (!applicants?.applications || applicants.applications.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                No applications found for this job
            </div>
        );
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants.applications.map((application) => (
                        <TableRow key={application._id}>
                            <TableCell className="font-medium">
                                {application?.applicant?.fullname || 'N/A'}
                            </TableCell>
                            <TableCell>{application?.applicant?.email || 'N/A'}</TableCell>
                            <TableCell>{application?.applicant?.phoneNumber || 'N/A'}</TableCell>
                            <TableCell>
                                {application?.applicant?.profile?.resume ? (
                                    <a 
                                        className="text-blue-600 hover:text-blue-800 cursor-pointer" 
                                        href={application.applicant.profile.resume} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        {application.applicant.profile.resumeOriginalName || 'View Resume'}
                                    </a>
                                ) : (
                                    <span className="text-gray-500">No Resume</span>
                                )}
                            </TableCell>
                            <TableCell>{application?.createdAt?.split("T")[0] || 'N/A'}</TableCell>
                            <TableCell>
                                <Badge 
                                    className={
                                        application.status === 'accepted' ? 'bg-green-500' :
                                        application.status === 'rejected' ? 'bg-red-500' :
                                        'bg-yellow-500'
                                    }
                                >
                                    {application.status.toUpperCase()}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="h-5 w-5 cursor-pointer" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        {shortlistingStatus.map((status) => (
                                            <div 
                                                key={status}
                                                onClick={() => statusHandler(status, application._id)}
                                                className="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer rounded"
                                            >
                                                <span>{status}</span>
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable