import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const authenticateToken=(request,response,next)=>{
    const authHeader=request.headers['authorization'];
    const token=authHeader&&authHeader.split(' ')[1];

    if (token==null){
        return response.status(401).json({msg:'token not found'});
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY,(error,user)=>{
        if (error){
            return response.status(403).json({msg:"invalid Token"});
        }

        request.user=user;
        next();
    })
}