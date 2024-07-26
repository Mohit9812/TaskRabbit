import multer from 'multer';
import path from 'path';
import {NextApiRequest, NextApiResponse} from 'next';

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({storage});

export const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: Function) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error){
                return reject(result);
            }
            return resolve(result);
        })
    })
}