import User from "../Model/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Student from "../Model/Student.js";
dotenv.config();

export function postUser(req, res) {
    const { first_name, last_name, email, password, class_title, class_level, languages, age, location, image, favorite_post_id } = req.body

    const hashedPassword = bcrypt.hashSync(password, 10)

    const model = new User({ first_name: first_name, last_name: last_name, email: email, password: hashedPassword, class_title: class_title, class_level: class_level, languages: languages, age: age, location: location, image: image, favorite_post_id: favorite_post_id ,role:"tutor" })
    model.save()
        .then((response) => {
            return res.status(200).send({ response })
        }).catch((err) => {
            return res.status(400).json(err.message)
        })
}
export function getUser(req, res) {

    User.find({}).populate('favorite_post_id')
        .then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            res.status(400).json(err.message)
        })
}

export function getUserById(req, res) {
    const id = req.params.id

    User.find({ _id: id }).populate('favorite_post_id')
        .then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            res.status(400).json(err.message)
        })
}


export function UpdateUser(req, res) {
    const id = req.params.id
    const data = req.body

    User.findByIdAndUpdate({ _id: id }, { $set: data })
        .then((response) => {
            res.status(200).json(response)
        }).catch((err) => {
            res.status(400).json(err.message)
        })
}
export function DeleteUser(req, res) {

    User.findByIdAndDelete({ _id: req.params.id })
        .then((response) => {
            res.status(200).json("deleted succs")
        }).catch((err) => {
            res.status(400).json(err.message)
        })
}

export  async function login(req, res) {

    const {password , email}=req.body
    const user = await User.findOne({email:email})
    const student = await Student.findOne({email:email})
    if(user){
    if(!user){
        res.json({message :" user dosen't exist !"})
    }
    const isPasswordValid = bcrypt.compareSync(password , user.password)
    if(!isPasswordValid){
        res.json({message :" Email or password not correct !"})
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
    return res.status(200).json({ message: 'Successfuly login', user: user, token });
    }else{
        if(!student){
            res.json({message :" user dosen't exist !"})
        }
        const isPasswordValidstudent = bcrypt.compareSync(password , student.password)
        if(!isPasswordValidstudent){
            res.json({message :" Email or password not correct !"})
        }
        const tokenStudent = jwt.sign({ id: student._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
        return res.status(200).json({ message: 'Successfuly login', student: student, tokenStudent });
    }
}

export function insertFavoritePost(req, res) {

    User.updateOne({ _id: req.params.id }, { $push: { favorite_post_id: req.body.favorite_post_id } })
        .then((response) => {
            return res.status(200).send({ response })
        }).catch((err) => {
            return res.status(400).json(err.message)
        })
}



const UserController = { postUser, getUser, getUserById, UpdateUser, DeleteUser, insertFavoritePost ,login }
export default UserController;
