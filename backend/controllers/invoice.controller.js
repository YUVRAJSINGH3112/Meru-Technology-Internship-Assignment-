const Invoice = require("../models/invoice.model");
const InvoiceLine = require("../models/InvoiceLine.model");

module.exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ isArchived: false })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      invoices
    });

  } catch (err) {
    console.log("FETCH INVOICE ERROR:", err);
    res.status(500).json({
      message: err.message
    });
  }
};

module.exports.createInvoice = async (req, res) => {
  try {
    const {
      invoiceNumber,
      customerName,
      issueDate,
      dueDate,
      total,
      items
    } = req.body;

    // 1️⃣ Create Invoice
    const newInvoice = await Invoice.create({
      invoiceNumber,
      customerName,
      issueDate,
      dueDate,
      total
    });

    // 2️⃣ Create Invoice Lines
    const invoiceLines = await Promise.all(
      items.map(item =>
        InvoiceLine.create({
          invoiceId: newInvoice._id,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice
        })
      )
    );

    res.json({
      success: true,
      invoice: newInvoice,
      lines: invoiceLines
    });

  } catch (err) {
    console.log("CREATE ERROR:", err);
    res.status(500).json({
      message: err.message
    });
  }
};


module.exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    const lines = await InvoiceLine.find({
      invoiceId: invoice._id
    });

    res.json({
      success: true,
      invoice,
      lines
    });

  } catch (err) {
    console.log("GET INVOICE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports.payInvoice = async (req, res) => {
  try {
    const { amount } = req.body;

    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    invoice.amountPaid += amount;

    if (invoice.amountPaid >= invoice.total) {
      invoice.status = "PAID";
      invoice.amountPaid = invoice.total;
    }

    await invoice.save();

    res.json({
      success: true,
      invoice
    });

  } catch (err) {
    console.log("PAY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


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
