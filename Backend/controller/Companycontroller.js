import Company from '../models/CompanyModel.js'

export default {
    Addcompany: async (req, res) => {
        try {
            // Extract the company data from the request body
            const companyData = req.body;
    
            // Create a new Company instance with the extracted data
            const newCompany = new Company(companyData);
    
            // Save the new company to the database
            await newCompany.save();
    
            // Respond with a success message
            res.status(200).json({
                success: true,
                message: "Company added successfully.",
            });
        } catch (err) {
            // If an error occurs, respond with an error message
            res.status(500).json({
                success: false,
                message: "Failed to add company.",
                error: err.message,
            });
        }
    },
    EditCompany: async (req, res) => {
        try {
            console.log(req.body,req.params);
            const { id } = req.params;
            const { companyname, location, person, contact } = req.body;
    
            // Find the company with the given ID
            const company = await Company.findById(id);
    
            if (!company) {
                // If the company with the given ID is not found, throw an error
                throw new Error("Company not found.");
            }
    
            // Check if the 'id' and 'company._id' match
           
    
            // Update the company with the new data
            await Company.findByIdAndUpdate(
                { _id: id },
                { companyname, location, person, contact },
                { new: true }
            );
    
            res.json({
                success: true,
                message: "Company edited successfully.",
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },
    DeleteCompany: async (req, res) => {
        try {
            const { id } = req.params
            await Company.findByIdAndDelete({ _id: id });
            res.json({
                success: true,
                message: "company deleted successfully",
            })
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },
    GetAllcompany: async (req, res) => {
        try {
            const response = await Company.find().sort({ createdAt: -1 })
            if (response) {
                res.json({
                    success:true,
                    message:"getting all company",
                    Data:response
                })
            }else{
                throw new Error(" company not found !!");
            }
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    }


}