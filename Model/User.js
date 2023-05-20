import mongoose from "mongoose";
const{Schema , model} = mongoose

const UserShema = new Schema ({
    first_name : {
        type:String
    },
    last_name : {
        type:String
    },
    email :{
        type :String
    },
    password :{
        type:String
    },
    class_title :{
        type : String
    },
    class_level :{
        type:String
    },
    languages : {
        type:String
    },
    location : {
        type :String
    },
    image : {
        type :String
    },
    number_phone : {
        type : String
    },
        description : {
        
        type :String
    },
    role: {
        type:String
    },
    favorite_post_id:[{
        type:Schema.Types.ObjectId,
        ref:"Post"
    }]
})

const User = model('User',UserShema);
export default User