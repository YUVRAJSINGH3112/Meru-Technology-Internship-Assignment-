const express=require('express');
const router=express.Router();

const invoiceController=require('../controllers/invoice.controller');

router.get('/:id',invoiceController.getInvoiceById);
router.post('/:id/payments',invoiceController.getPaymentsByInvoiceId);
router.post('/:id/archive',invoiceController.archiveInvoice);

module.exports=router;