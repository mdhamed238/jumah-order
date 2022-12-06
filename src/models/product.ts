import { IProduct } from "../types/product";
import mongoose, { model, Schema } from "mongoose";

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
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});

export const Product = model<IProduct>("Product", productSchema);
    