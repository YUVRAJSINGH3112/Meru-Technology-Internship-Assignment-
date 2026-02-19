const invoiceModel=require('../models/invoice.model');

module.exports.createInvoice=async (req,res)=>{
    try{
        const {invoiceNumber,customerName,issueDate,dueDate,total}=req.body;

        const newInvoice=await invoiceModel.create({
            invoiceNumber,
            customerName,
            issueDate,
            dueDate,
            total
        })

        res.json({
        success:true,
        invoice:newInvoice
        })
    }
    catch(err){
        res.status(500).send("Error creating invoice");
    }
}

module.exports.getInvoiceById = async (req, res) => {
    try{
        const id =req.params.id;

        const invoice=invoiceModel.findById(id);
        res.json({
        success:true,
        invoice
        })
    }
    catch(err){
        res.status(500).send("Error fetching invoice");
    }
}

module.exports.getPaymentsByInvoiceId=async (req,res)=>{
    try{
        const id=req.params.id;

        const payments=invoiceModel.findPaymentsByInvoiceId(id);
        res.json({
        success:true,
        payments
        })
    }
    catch(err){
        res.status(500).send("Error fetching payments");
    }
}

module.exports.archiveInvoice= async (req, res) => {
    try {
        const { isArchived } = req.body;

        const updated = await Invoice.findByIdAndUpdate(
            req.params.id,
            { isArchived },
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).send("Error updating archive status");
    }
}
