import { Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    price: number;
    description: string;
    category: string;
    user_id: string;
    images: string[];
}