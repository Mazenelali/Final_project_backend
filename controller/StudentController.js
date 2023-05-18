import Student from "../Model/Student.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function postStudent(req, res) {
    const { first_name, last_name, email, password , favorite_post_id } = req.body

    const hashedPassword = bcrypt.hashSync(password, 10)

    const model = new Student({ first_name: first_name, last_name: last_name, email: email, password: hashedPassword , favorite_post_id: favorite_post_id ,role:"student" })
    model.save()
        .then((response) => {
            return res.status(200).send({ response })
        }).catch((err) => {
            return res.status(400).json(err.message)
        })
}
export function getStudent(req, res) {

    Student.find({}).populate('favorite_post_id')
        .then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            res.status(400).json(err.message)
        })
}

export function getStudentById(req, res) {
    const id = req.params.id

    Student.find({ _id: id }).populate('favorite_post_id')
        .then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            res.status(400).json(err.message)
        })
}


export function UpdateStudent(req, res) {
    const id = req.params.id
    const data = req.body

    Student.findByIdAndUpdate({ _id: id }, { $set: data })
        .then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            res.status(400).json(err.message)
        })
}
export function DeleteStudent(req, res) {

    Student.findByIdAndDelete({ _id: req.params.id })
        .then((response) => {
            res.status(200).json("deleted succs")
        }).catch((err) => {
            res.status(400).json(err.message)
        })
}

export  async function loginStudent(req, res) {

    const {password , email}=req.body
    const user = await Student.findOne({email:email})
    
    if(!user){
        res.json({message :" user dosen't exist !"})
    }

    const isPasswordValid = bcrypt.compareSync(password , user.password)
    if(!isPasswordValid){
        res.json({message :" Email or password not correct !"})
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
    return res.status(200).json({ message: 'Successfuly login', Student: user, token });
}

export function insertFavoritePost(req, res) {

    Student.updateOne({ _id: req.params.id }, { $push: { favorite_post_id: req.body.favorite_post_id } })
        .then((response) => {
            return res.status(200).send({ response })
        }).catch((err) => {
            return res.status(400).json(err.message)
        })
}



const StudentController = { postStudent, getStudent, getStudentById, UpdateStudent, DeleteStudent, insertFavoritePost ,loginStudent }
export default StudentController;
