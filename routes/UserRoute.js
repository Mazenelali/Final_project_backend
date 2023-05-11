import express from "express"
import UserController from "../controller/UserController.js"

const router = express.Router()

router.post("/" , UserController.postUser)

export default router