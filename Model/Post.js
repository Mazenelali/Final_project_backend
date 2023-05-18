import mongoose from "mongoose";

const {Schema , model} = mongoose

const PostSchema = new Schema ({

    title:{
        type:String
    },
    description:{
        type:String
    },
    location:{
        type:String
    },
    availble_week :{
        type:String
    },
    price:{
        type:Number
    },
    image:{
        type:String
    },
    User_id:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }]
})

const Post = model('Post',PostSchema)
export default Post