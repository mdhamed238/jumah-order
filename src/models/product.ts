import { IProduct } from "../types/product";
import { model, Schema } from "mongoose";

const productSchema:Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export const Product = model<IProduct>("Product", productSchema);
    