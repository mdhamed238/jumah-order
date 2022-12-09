import e, { Response, Request, NextFunction } from "express";
import { IUser } from "../types/user";
import User from "../models/user";

const jwt = require("jsonwebtoken");


export interface CustomRequest extends Request {
    token: string | undefined;
}


const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).send("invalid token provided.");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded.user_id);

        if (!decoded) {
            return res.status(401).send("Authentication credentials invalid.");
        }


        const user: IUser | null = await User.findOne({ _id: decoded.user_id });
    
        if (!user) {
        throw new Error();
        }
    
        (req as CustomRequest).token = decoded;
        next();
    } catch (e) {
        res.status(401).send({ error: "Please authenticate. | token expired" });
    }
}
    

export default authenticate;