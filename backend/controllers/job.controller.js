import Job from "../models/job.model.js";
import { generateApplicationStatusEmail } from '../utils/emailTemplates.js';
import { sendEmail } from '../utils/email.js';
import { Application } from "../models/application.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.user.userId;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const job = await Job.create({
            title,
            description,
            requirements,
            salary: Number(salary),
            location,
            jobType,
            experience: Number(experience),
            position,
            company: companyId,
            createdBy: userId,
        });
        return res.status(201).json({ message: "Job created successfully", success: true, job });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong", success: false, error: error.message });
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = keyword ? {
            $or: [
                {title: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}},
            ]
        } : {};
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({createdAt: -1});
        if(!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found", success: false });
        }
        return res.status(200).json({ message: "Jobs fetched successfully", success: true, jobs });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong", success: false });
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }
        return res.status(200).json({ message: "Job fetched successfully", success: true, job });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong", success: false });
    }
}

//admin

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.user.userId;
        const jobs = await Job.find({ createdBy: adminId })
            .populate({
                path: "company",
                select: "name logo" // Only select the fields we need
            })
            .sort({ createdAt: -1 });
            
        if(!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found", success: false });
        }
        return res.status(200).json({ success: true, jobs });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong", success: false });
    }
}

export const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status, sendEmail: shouldSendEmail = false } = req.body;

        if (!['pending', 'accepted', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Status must be pending, accepted, or rejected'
            });
        }

        // Find the application and populate necessary fields
        const application = await Application.findById(applicationId)
            .populate('job')
            .populate('applicant')
            .populate({
                path: 'job',
                populate: {
                    path: 'company',
                    model: 'Company'
                }
            });

        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }

        // Update application status
        application.status = status;
        await application.save();

        // Only send email if shouldSendEmail is true
        if (shouldSendEmail) {
            // Send email notification
            const emailTemplate = generateApplicationStatusEmail(
                application.applicant.fullName,
                application.job.title,
                application.job.company.name,
                req.user.fullName,
                req.user.email,
                status
            );

            const emailSent = await sendEmail(
                application.applicant.email,
                emailTemplate.subject,
                emailTemplate.html
            );

            if (!emailSent) {
                return res.status(200).json({
                    success: true,
                    message: 'Application status updated but notification email failed to send',
                    warning: 'Email notification could not be sent'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Application status updated and notification sent successfully'
            });
        }

        // If no email was requested to be sent
        return res.status(200).json({
            success: true,
            message: 'Application status updated successfully'
        });

    } catch (error) {
        console.error('Error updating application status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update application status',
            error: error.message
        });
    }
};

export const acceptApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;

        // Find the application and populate necessary fields
        const application = await Application.findById(applicationId)
            .populate('job')
            .populate('applicant')
            .populate({
                path: 'job',
                populate: {
                    path: 'company',
                    model: 'Company'
                }
            });

        if (!application) {
            return res.status(404).json({ 
                success: false, 
                message: 'Application not found' 
            });
        }

        // Update application status to accepted
        application.status = 'accepted';
        await application.save();

        // Generate and send acceptance email
        const emailTemplate = generateApplicationStatusEmail(
            application.applicant.fullName,
            application.job.title,
            application.job.company.name,
            req.user.fullName,
            req.user.email,
            'accepted'
        );

        const emailSent = await sendEmail(
            application.applicant.email,
            emailTemplate.subject,
            emailTemplate.html
        );

        if (!emailSent) {
            return res.status(200).json({
                success: true,
                message: 'Application accepted but notification email failed to send',
                warning: 'Email notification could not be sent',
                application
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Application accepted and notification sent successfully',
            application
        });

    } catch (error) {
        console.error('Error accepting application:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to accept application',
            error: error.message
        });
    }
};