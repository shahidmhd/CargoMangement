import express from 'express'
const router=express.Router()
import usercontroller from '../controller/usercontroller.js';
import Companycontroller from '../controller/Companycontroller.js';


router.post('/login',usercontroller.LoginUser)

router.post('/company',Companycontroller.Addcompany)
router.patch('/company/:id',Companycontroller.EditCompany)
router.delete('/company/:id',Companycontroller.DeleteCompany)
router.get('/company',Companycontroller.GetAllcompany)



export default router;