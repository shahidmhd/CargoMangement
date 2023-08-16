import express from 'express'
const router=express.Router()
import usercontroller from '../controller/usercontroller.js';
import Companycontroller from '../controller/Companycontroller.js';
import ServiceController from '../controller/ServiceController.js';
import Invoicecontroller from '../controller/InvoiceController.js'
import userAuthMid from '../Middlewear/Authmiddlewear.js';


router.post('/login',usercontroller.LoginUser)
router.post('/changepassword',usercontroller.changepassword)

router.post('/company',userAuthMid,Companycontroller.Addcompany)
router.patch('/company/:id',userAuthMid,Companycontroller.EditCompany)
router.delete('/company/:id',userAuthMid,Companycontroller.DeleteCompany)
router.get('/company',userAuthMid,Companycontroller.GetAllcompany)


router.post('/service',userAuthMid,ServiceController.AddService)
router.post('/service/:id',userAuthMid,ServiceController.Editservice)
router.delete('/service/:id',userAuthMid,ServiceController.Deleteservice)
router.get('/service',userAuthMid,ServiceController.GetAllservice)

router.post('/invoice',userAuthMid,Invoicecontroller.AddINVOICE)
router.get('/invoice',userAuthMid,Invoicecontroller.GetAllinvoice)
router.get('/invoice/:id',userAuthMid,Invoicecontroller.GetSelectedinvoice)
router.delete('/invoice/:id',userAuthMid,Invoicecontroller.Deleteinvoice)
router.patch('/invoice/:id',userAuthMid,Invoicecontroller.EditINVOICE)
export default router;