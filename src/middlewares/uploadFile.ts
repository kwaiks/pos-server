import multer from "multer";
import fs from "fs";
import path from "path";
import { storeDir, productDir, storeMediaDir} from "@/config/appConfig";

export const storeImage = multer({
    storage: multer.diskStorage({
        destination: storeDir,
        filename: (req, file, cb) => {
            const fileName = randomFileName(file.originalname);
            const filePath = `/${fileName}`;
            // remove public path
            req.body.storePicture = storeDir.replace("public","")+filePath; 
            if (fs.existsSync(storeDir)) {
                return cb(null, filePath);
            }
            fs.mkdirSync(storeDir);
            return cb(null, filePath);
        }
    })
});

export const storeGalleryImage = multer({
    storage: multer.diskStorage({
        destination: storeMediaDir,
        filename: (req, file, cb) => {
            const fileName = randomFileName(file.originalname);
            const filePath = `/${fileName}`;
            // remove public path
            req.body.mediaPath = storeMediaDir.replace("public","")+filePath;
            console.log("woi",req.body); 
            if (fs.existsSync(storeDir)) {
                return cb(null, filePath);
            }
            fs.mkdirSync(storeMediaDir);
            return cb(null, filePath);
        }
    })
});

export const menuImage = multer({
    storage: multer.diskStorage({
        destination: productDir,
        filename: (req, file, cb) => {
            const fileName = randomFileName(file.originalname);
            const filePath = `/${fileName}`;
             // remove public path
            req.body.itemPicture = productDir.replace("public","")+filePath;
            if (fs.existsSync(productDir)) {
                return cb(null, filePath);
            } 
            fs.mkdirSync(productDir);
            return cb(null, filePath);
        }
    })
});

const randomFileName = (fileName: string): string => {
    let result = "";
    const characters = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charsLength = characters.length;
    for ( let i = 0; i < 10; i++ ){
        result += characters.charAt(Math.floor(Math.random() * charsLength));
    }
    result += (Date.now() + path.extname(fileName));
    return result;
};

export default {
    storeImage,
    menuImage,
    storeGalleryImage
};
