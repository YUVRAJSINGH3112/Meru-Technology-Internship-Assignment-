const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    customerName: { 
        type: String, 
        required: true 
    },
    issueDate: { 
        type: Date, 
        required: true 
    },
    dueDate: {
         type: Date,
         required: true 
    },
    status: { 
        type: String, 
        enum: ['DRAFT', 'PAID'], 
        default: 'DRAFT' 
    },
    total: { 
        type: Number, 
        required: true 
    },
    amountPaid: { 
        type: Number, 
        default: 0 
    },
    balanceDue: {
         type: Number, 
    },
    isArchived: { 
        type: Boolean, 
        default: false 
    }
})

invoiceSchema.pre('save', function(next) {
    this.balanceDue = this.total - this.amountPaid;
    next();
});

module.exports=mongoose.model('Invoice', invoiceSchema);