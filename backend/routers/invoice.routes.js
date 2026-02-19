const express=require('express');
const router=express.Router();
const authMiddleware=require('../middlewares/authMiddleware')
const invoiceController=require('../controllers/invoice.controller');

router.post('/create',authMiddleware.authMiddleware,invoiceController.createInvoice);
router.get('/all',authMiddleware.authMiddleware,invoiceController.getAllInvoices);
router.get('/:id',authMiddleware.authMiddleware,invoiceController.getInvoiceById);
router.post('/:id/pay',authMiddleware.authMiddleware,invoiceController.payInvoice);
router.post('/:id/archive',authMiddleware.authMiddleware,invoiceController.archiveInvoice);

module.exports=router;