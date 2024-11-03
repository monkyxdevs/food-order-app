<<<<<<< HEAD
import * as jwt from "jsonwebtoken";
import { SECRET } from "./config";
import {Request,Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            userId?: string; 
        }
    }
}
export const authenticateJWT = (req: Request,res:Response,next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(402).json({});
    }
    const token  = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET) as { userId: string }; 
        if (decoded.userId) {
            req.userId = decoded.userId; 
            next(); 
        } else {
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        }
    } catch (error) {
        return res.status(403).json({});
    }
=======
import * as jwt from "jsonwebtoken";
import { SECRET } from "./config";
import {Request,Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            userId?: string; 
        }
    }
}
export const authenticateJWT = (req: Request,res:Response,next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(402).json({});
    }
    const token  = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET) as { userId: string }; 
        if (decoded.userId) {
            req.userId = decoded.userId; 
            next(); 
        } else {
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        }
    } catch (error) {
        return res.status(403).json({});
    }
>>>>>>> 61fdff0a553d8ab22090404d4345fd223233ab3b
};