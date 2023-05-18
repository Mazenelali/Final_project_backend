import mongoose from "mongoose";
const{Schema , model} = mongoose

const AdminSchema = new Schema ({
    email :{
        type :String
    },
    password :{
        type:String
    },
})

const Admin = model('Admin',AdminSchema);
export default Admin