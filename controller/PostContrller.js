import Post from "../Model/Post.js"


export function AddPost (req ,res){
    const data = req.body
    const model = new Post(data)
    model.save()
    .then((response)=>{
        return res.status(200).send({response})
    }).catch((err)=>{
        return res.status(400).json(err.message)
    })
}
export function getPost (req, res){

    Post.find({}).populate("User_id")
    .then((response)=>{
        res.status(200).json(response)
    }).catch((err)=>{
        res.status(400).json(err.message)
    })
}

export function getPostById (req, res){
    const id = req.params.id

    Post.find({_id:id}).populate("User_id")
    .then((response)=>{
        res.status(200).json(response)
    }).catch((err)=>{
        res.status(400).json(err.message)
    })
}

export function UpdatePost (req, res){
    const id = req.params.id
    const data = req.body

    Post.findByIdAndUpdate({_id:id} ,{$set:data})
    .then((response)=>{
        res.status(200).json(response)
    }).catch((err)=>{
        res.status(400).json(err.message)
    })
}

export function DeletePost (req, res){

    Post.findByIdAndDelete({_id:req.params.id})
    .then((response)=>{
        res.status(200).json(response)
    }).catch((err)=>{
        res.status(400).json(err.message)
    })
}

const PostController = {AddPost,UpdatePost,getPost,getPostById,DeletePost}
export default PostController;
