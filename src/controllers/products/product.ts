import { Response, Request, NextFunction } from "express";
import { Product } from "../../models/product";
import User from "../../models/user";
const jwt = require("jsonwebtoken");

import { IProduct } from "../../types/product";



const getAllProducts = async (req: Request, res: Response): Promise<void> => {  // <--- Notice the return type of Promise<void> which means that this function will return a promise that will resolve to void (nothing)
    try {

        const products: IProduct[] = await Product.find().populate("user_id"); // <--- populate is a mongoose method that allows you to populate a field with the data from another collection
        res.status(200).json({ products });
    } catch (error) {
        throw error;
    }
};


const addProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


    try {

        // decode the token and get the user id
        const decoded = jwt.verify(req.headers.authorization?.split(" ")[1], process.env.JWT_SECRET);

        console.log({ "decoded ============================": decoded });

        const user = await User.findOne({ _id: decoded.user_id });
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        const user_id = user._id;

        const body = req.body as Pick<IProduct, "name" | "price" | "description" | "category">;  // <--- Pick is a generic type that allows you to select which properties you want to use from the IProduct interface


        // validate input
        if (!body.name || !body.price || !body.description || !body.category) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }


        const product: IProduct = new Product({
            name: body.name,
            price: body.price,
            description: body.description,
            category: body.category,
            user_id,
        });

        const newProduct: IProduct = await product.save();
        const allProducts: IProduct[] = await Product.find();

        res
            .status(201)
            .json({ message: "Product added", product: newProduct, products: allProducts });
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req;
        const updateProduct: IProduct | null = await Product.findByIdAndUpdate(
            { _id: id },
            body
        );
        const allProducts: IProduct[] = await Product.find(); // this is not necessary, but I added it to show how to get all products after updating one
        res.status(200).json({
            message: "Product updated",
            product: updateProduct,
            products: allProducts,
        });
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const deletedProduct: IProduct | null = await Product.findByIdAndRemove(
            req.params.id
        );
        const allProducts: IProduct[] = await Product.find(); // this is not necessary, but I added it to show how to get all products after deleting one
        res.status(200).json({
            message: "Product deleted",
            product: deletedProduct,
            products: allProducts,
        });
    } catch (error) {
        next(error);
    }
};

const getSingleProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { params: { id } } = req;
        const product: IProduct | null = await Product.findById({ _id: id });

        // handle if product is not found
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.status(product ? 200 : 404).json({ product });
    } catch (error) {
        next(error);
    }
};


export { getAllProducts, addProduct, updateProduct, deleteProduct, getSingleProduct };


