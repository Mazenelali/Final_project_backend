import mongoose from "mongoose";
const{Schema , model} = mongoose

const StudentSchema = new Schema ({
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
    role :{
        type:String
    },
    favorite_post_id:[{
        type:Schema.Types.ObjectId,
        ref:"Post"
    }]
})

const Student = model('Student',StudentSchema);
export default Student