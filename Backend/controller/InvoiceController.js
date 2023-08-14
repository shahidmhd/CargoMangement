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
            console.log(err, "error");
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
                    success: true,
                    message: "getting all invoice",
                    Data: response
                })
            } else {
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
    },
    Deleteinvoice: async (req, res) => {
        try {
            const { id } = req.params
            await invoice.findByIdAndDelete({ _id: id });
            res.json({
                success: true,
                message: "invoice deleted successfully",
            })
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },
    EditINVOICE: async (req, res) => {
        try {
            const { id } = req.params;
            const { invoiceNumber, airwayBillNo } = req.body;
            console.log(id, "iddddddddddddddddddddddddddddddddddddddddddddddddd");
            console.log(req.body);

            const Invoice = await invoice.findById(id);
            if (!Invoice) {

                // If the company with the given ID is not found, throw an error
                throw new Error("invoice not found.");
            } 

                // Check if the 'invoiceNumber' already exists for a different invoice
                // const existingInvoiceNumber = await invoice.findOne({ invoiceNumber: invoiceNumber });

                // if (existingInvoiceNumber && id !== existingInvoiceNumber._id.toString()) {
                //     // If the invoiceNumber already exists for a different invoice, throw an error
                //     throw new
                //         AppError('Invoice number already exists', 403);
                // }

                // Check if the 'airwayBillNo' already exists for a different invoice
                const existingAirwayBillNo = await invoice.findOne({ airwayBillNo: airwayBillNo });

                if (existingAirwayBillNo && id !== existingAirwayBillNo._id.toString()) {
                    // If the airwayBillNo already exists for a different invoice, throw an error
                    throw new AppError('Airway bill number already exists', 403);
                }

                // Update the invoice with the new data
                await invoice.findByIdAndUpdate(
                    { _id: id },
                    { invoiceNumber, airwayBillNo,...req.body },
                    { new: true }
                );

                res.status(200).json({
                    success: true,
                    message: "invoice added successfully.",
                });

            
        } catch (err) {
            console.log(err, "error");
            // If an error occurs, respond with an error message
            res.status(500).json({
                success: false,
                message: "Failed to edit invoice.",
                error: err.message,
            });
        }
    },


}