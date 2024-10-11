import mongoose from "mongoose";


const userSchema =mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

}
)

const user=mongoose.model('sejalagarwal1563', userSchema);

export default user;