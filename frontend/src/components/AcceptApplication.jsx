import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

const AcceptApplication = ({ applicationId, userRole }) => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    // Only show accept button for recruiters
    if (userRole !== 'recruiter') {
        return null;
    }

    const handleAccept = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`/api/applications/${applicationId}/accept`);
            
            if (response.data.status === 'accepted') {
                toast({
                    title: "Success",
                    description: "You have accepted this application",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to accept application",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleAccept}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700"
        >
            {loading ? "Processing..." : "Accept Application"}
        </Button>
    );
};

export default AcceptApplication; 