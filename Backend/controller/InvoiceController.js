import invoice from '../models/Invoicemodel.js'

export default {
    AddINVOICE: async (req, res) => {
        try {
           console.log(req.body);
           // Create a new Company instance with the extracted data
          const newservice = new invoice(req.body);
  
          // Save the new company to the database
          await newservice.save();
  
            res.status(200).json({
                success: true,
                message: "invoice added successfully.",
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
    GetAllinvoice: async (req, res) => {
        try {
            const response = await invoice.find().sort({ createdAt: -1 }).populate('selectedCompanyId');
            if (response) {
                res.json({
                    success:true,
                    message:"getting all invoice",
                    Data:response
                })
            }else{
                throw new Error(" invoice not found !!");
            }
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },
    GetSelectedinvoice: async (req, res) => {
        try {
            const { id } = req.params;
            const response = await invoice.findById(id).populate('selectedCompanyId');
            if (response) {
                res.json({
                    success: true,
                    message: "Invoice data found",
                    Data: response
                });
            } else {
                throw new Error("Invoice not found !!");
            }
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            });
        }
    }
   
   


}