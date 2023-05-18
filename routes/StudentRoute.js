import express from "express"
import StudentController from "../controller/StudentController.js"


const router = express.Router()

router.post("/addStudent" ,StudentController.postStudent)
router.get("/getStudent" , StudentController.getStudent)
router.get("/getStudent/:id" , StudentController.getStudentById)
router.put("/updateStudent/:id" , StudentController.UpdateStudent)
router.delete("/deleteStudent/:id" , StudentController.DeleteStudent)
router.post("/addFavoriteCourse/:id" , StudentController.insertFavoritePost)

router.post("/loginStudent" , StudentController.loginStudent)

export default router