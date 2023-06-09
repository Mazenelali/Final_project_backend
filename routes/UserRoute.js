import express from "express"
import UserController from "../controller/UserController.js"
import image  from "../Middleware/Upload_image.js"

const router = express.Router()

router.post("/" ,UserController.postUser)
router.get("/" , UserController.getUser)
router.get("/:id" , UserController.getUserById)
router.patch("/:id" , UserController.UpdateUser)
router.delete("/:id" , UserController.DeleteUser)
router.post("/addFavorite/:id" , UserController.insertFavoritePost)

router.post("/login" , UserController.login)

export default router