import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;

const storage=new GridFsStorage({
    url:`mongodb+srv://${username}:${password}@cluster0.eargafe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    options:{useNewUrlParser:true, useUnifiedTopology: true },
    file:(request,file)=>{
        console.log('Uploaded file:', file);
        const match=["image/png","image/jpg"];

        if (match.indexOf(file.mimeType)===-1){
            return `${Date.now()}-blog-${file.originalname}`;
        }

        return{
            bucketName:"photos",
            filename:`${Date.now()}-blog-${file.originalname}`
        }
    }
})

export default multer({storage});