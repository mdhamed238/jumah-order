import { Response, Request } from "express";
import { Product } from "../../models/product";

import { IProduct } from "../../types/product";

const getAllProducts = async (req: Request, res: Response): Promise<void> => {  // <--- Notice the return type of Promise<void> which means that this function will return a promise that will resolve to void (nothing)
    try {
        const products: IProduct[] = await Product.find();  // IpProduct[] is an array of IProduct objects
        res.status(200).json({ products });
    } catch (error) {
        throw error;
    }
};


const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IProduct, "name" | "price" | "description" | "category">;  // <--- Pick is a generic type that allows you to select which properties you want to use from the IProduct interface

        const product: IProduct = new Product({
            name: body.name,
            price: body.price,
            description: body.description,
            category: body.category,
        });

        const newProduct: IProduct = await product.save();
        const allProducts: IProduct[] = await Product.find();

        res
            .status(201)
            .json({ message: "Product added", product: newProduct, products: allProducts });
    } catch (error) {
        throw error;
    }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
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
        throw error;
    }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
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
        throw error;
    }
};

const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
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
        throw error;
    }
};


export { getAllProducts, addProduct, updateProduct, deleteProduct, getSingleProduct };


