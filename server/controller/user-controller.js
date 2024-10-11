import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import token from "../model/token.js";

dotenv.config();



export const signUpuser= async (request,response)=>{
    try{

        // const salt = await bcrypt.genSalt();
        const hashedPassword=await bcrypt.hash(request.body.password,10);
        const user={ name:request.body.name, username:request.body.username, password:hashedPassword};

        const newUser=new User(user);
        await newUser.save();

        return response.status(200).json({msg:'signup successful'})
    }catch(err){
        return response.status(500).json({msg:'error while signup'})
    }

}


export const loginUser=async(request,response)=>{
    let user=await User.findOne({username:request.body.username});
    if(!user){
        return response.status(400).json({msg:"username not found"})
    }

    try{
        let match=await bcrypt.compare(request.body.password,user.password)
        if(match){
            const accessToken=jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'})
            const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);

            const newToken=new token({ token:refreshToken})

            await newToken.save();

            return response.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:user.name,username:user.username})
        }else{
            response.status(400).json({msg:"password not match"})
        }
    }catch(error){

        return response.status(500).json({msg:"error while logging in the user"})

    }
}