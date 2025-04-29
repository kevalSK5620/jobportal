import Job from "../models/job.model.js";

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