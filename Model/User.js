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
    category : {
        type : String
    },
    class_level :{
        type:String
    },
    languages : {
        type:String
    },
    age :{
        type :Number
    },
    location : {
        type :String
    },
    image : {
        type :String
    },
    favorite_post_id:{

    }
})

const User = model('User',UserShema);
export default User