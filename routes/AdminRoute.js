import express from "express"
import AdminController from "../controller/AdminController.js"


const router = express.Router()

router.post("/addAdmin" ,AdminController.postAdmin)
router.get("/getAdmin" , AdminController.getAdmin)
router.put("/updateAdmin/:id" ,  AdminController.UpdateAdmin)
router.delete("/deleteAdmin/:id" , AdminController.DeleteAdmin)


router.post("/loginAdmin" , AdminController.loginAdmin)

export default router