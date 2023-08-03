import express from 'express'
const router=express.Router()
import usercontroller from '../controller/usercontroller.js';
import Companycontroller from '../controller/Companycontroller.js';
import ServiceController from '../controller/ServiceController.js';


router.post('/login',usercontroller.LoginUser)

router.post('/company',Companycontroller.Addcompany)
router.patch('/company/:id',Companycontroller.EditCompany)
router.delete('/company/:id',Companycontroller.DeleteCompany)
router.get('/company',Companycontroller.GetAllcompany)


router.post('/service',ServiceController.AddService)
router.post('/service/:id',ServiceController.Editservice)
router.delete('/service/:id',ServiceController.Deleteservice)
router.get('/service',ServiceController.GetAllservice)



export default router;