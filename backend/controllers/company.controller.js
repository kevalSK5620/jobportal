import Company from "../models/company.model.js";
import mongoose from "mongoose";

export const createCompany = async (req, res) => {
    try {
        const {companyName} = req.body;
        if(!companyName) {
            return res.status(400).json({message: "Company name is required", success: false});
        }
        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({message: "Company already exists", success: false});
        }
        company = await Company.create({name:companyName, UserId:req.user.userId});
        return res.status(201).json({message: "Company created successfully", success: true, company});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error creating company", success: false});
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.user.userId;
        const companies = await Company.find({ UserId: userId });
        
        if(!companies || companies.length === 0){
            return res.status(404).json({
                message: "No companies found", 
                success: false
            });
        }
        
        return res.status(200).json({
            message: "Companies fetched successfully", 
            success: true, 
            companies
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching companies", 
            success: false
        });
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        
        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({
                message: "Invalid company ID format",
                success: false
            });
        }

        const company = await Company.findById(companyId);
        
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company fetched successfully",
            success: true,
            company
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching company",
            success: false
        });
    }
}

export const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        
        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({
                message: "Invalid company ID format",
                success: false
            });
        }

        // First check if company exists and belongs to the user
        const existingCompany = await Company.findOne({
            _id: companyId,
            UserId: req.user.userId
        });

        if (!existingCompany) {
            return res.status(404).json({
                message: "Company not found or you don't have permission to update it",
                success: false
            });
        }

        const updateData = {
            name: req.body.name,
            description: req.body.description,
            website: req.body.website,
            location: req.body.location
        };

        // Add logo URL if file was uploaded
        if (req.file) {
            // Create the full URL for the uploaded file
            const protocol = req.protocol;
            const host = req.get('host');
            updateData.logo = `${protocol}://${host}/uploads/${req.file.filename}`;
        }

        // Remove undefined fields
        Object.keys(updateData).forEach(key => 
            updateData[key] === undefined && delete updateData[key]
        );

        const company = await Company.findByIdAndUpdate(
            companyId, 
            updateData, 
            {new: true}
        );

        return res.status(200).json({
            message: "Company updated successfully", 
            success: true, 
            company
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error updating company", 
            success: false
        });
    }
}
