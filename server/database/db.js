import mongoose from 'mongoose'


export const Connection=async (URL)=>{
    try{
        await mongoose.connect(URL,{useNewUrlParser:true})
        console.log('databse connected ')
    }catch(error){

        console.log('error while connecting ',error)
    }
}