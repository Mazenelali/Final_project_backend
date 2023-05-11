import User from "../Model/User.js";


export async function postUser (req ,res){
    const data = req.body
    const model = new User(data)
    model.save()
    .then((response)=>{
        return res.status(200).send({response})
    }).catch((err)=>{
        return res.status(400).json(err.message)
    })
} 

const UserController = {postUser}
export default UserController;
