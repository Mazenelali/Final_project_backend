import express from "express"
import PostController from "../controller/PostContrller.js"
import image  from "../Middleware/Upload_image.js"
const router = express.Router()

router.post("/" , PostController.AddPost)
router.get("/" , PostController.getPost)
router.get("/:id" , PostController.getPostById)
router.patch("/:id" ,  PostController.UpdatePost)
router.delete("/:id" , PostController.DeletePost)

export default router