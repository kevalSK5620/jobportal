import { Application } from "../models/application.model.js";
import Job from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.user.userId;
        const jobId = req.params.id;
        
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            });
        }

        if (!userId) {
            return res.status(400).json({
                message: "User authentication required.",
                success: false
            });
        }

        // check if the job exists first
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        // create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        // Update job's applicants array
        if (!job.applicants) {
            job.applicants = [];
        }
        job.applicants.push(userId);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully.",
            success: true,
            application: newApplication
        });
    } catch (error) {
        console.error("Error in applyJob:", error);
        return res.status(500).json({
            message: "Internal server error: " + error.message,
            success: false
        });
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user.userId;
        
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                populate: {
                    path: 'company'
                }
            });

        if (!applications || applications.length === 0) {
            return res.status(200).json({
                message: "No applications found",
                success: true,
                application: []
            });
        }

        return res.status(200).json({
            message: "Applications fetched successfully",
            success: true,
            application: applications
        });
    } catch (error) {
        console.error("Error in getAppliedJobs:", error);
        return res.status(500).json({
            message: "Error fetching applications: " + error.message,
            success: false
        });
    }
};

// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
            .populate({
                path: 'applicants',
                populate: {
                    path: 'applicant',
                    select: 'fullname email phoneNumber profile createdAt'
                }
            });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        const applications = await Application.find({ job: jobId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'applicant',
                select: 'fullname email phoneNumber profile createdAt'
            });

        if (!applications || applications.length === 0) {
            return res.status(200).json({
                message: "No applicants found for this job",
                success: true,
                job: {
                    ...job.toObject(),
                    applications: []
                }
            });
        }

        return res.status(200).json({
            message: "Applicants fetched successfully",
            success: true,
            job: {
                ...job.toObject(),
                applications: applications
            }
        });
    } catch (error) {
        console.error("Error in getApplicants:", error);
        return res.status(500).json({
            message: "Error fetching applicants: " + error.message,
            success: false
        });
    }
};

export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}