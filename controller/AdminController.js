import Admin from "../Model/Admin.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export function postAdmin(req, res) {
    const { email, password  } = req.body

    const hashedPassword = bcrypt.hashSync(password, 10)

    const model = new Admin({ email: email, password: hashedPassword })
    model.save()
        .then((response) => {
            return res.status(200).send({ response })
        }).catch((err) => {
            return res.status(400).json(err.message)
        })
}

export function getAdmin(req, res) {

        Admin.find({})
        .then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            res.status(400).json(err.message)
        })
}

export function UpdateAdmin(req, res) {
    const id = req.params.id
    const data = req.body

    Admin.findByIdAndUpdate({ _id: id }, { $set: data })
        .then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            res.status(400).json(err.message)
        })
}

export function DeleteAdmin(req, res) {

    Admin.findByIdAndDelete({ _id: req.params.id })
        .then((response) => {
            res.status(200).json("deleted succs")
        }).catch((err) => {
            res.status(400).json(err.message)
        })
}


export  async function loginAdmin(req, res) {

    const {password , email}=req.body
    const user = await Admin.findOne({email:email})
    
    if(!user){
        res.json({message :" user dosen't exist !"})
    }

    const isPasswordValid = bcrypt.compareSync(password , user.password)
    if(!isPasswordValid){
        res.json({message :" Email or password not correct !"})
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
    return res.status(200).json({ message: 'Successfuly login', Admin: user, token });
}

const AdminController = { postAdmin, getAdmin, DeleteAdmin, UpdateAdmin ,loginAdmin }
export default AdminController;