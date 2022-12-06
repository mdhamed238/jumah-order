import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    resetPasswordExpire: string;
    resetPasswordToken: string;
    getResetPasswordToken: () => string;

}

