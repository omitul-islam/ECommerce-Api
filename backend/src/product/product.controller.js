import productModel from "./product.model.js";
import { CreateProductService, getAllProductsService, updateProductService,deleteProductService} from "./product.service.js";
import { validationProduct } from "./product.validate.js";

export const createProduct = async (req, res) => {
    try {
        // console.log(req.body.name);
        const existingProduct = await productModel.findOne({name:req.body.name});
        if(existingProduct) {
            console.log(existingProduct);
            return res.status(400).json({ message: "Product already exists" });
        }
        req.body.price = parseFloat(req.body.price);
        req.body.stock = parseFloat(req.body.stock);
        const parseData = validationProduct.createProductSchema.parse(req.body);
        
        const { name, price, category, stock } = parseData;
        const image = req.file ? `/uploads/${req.file.filename}` : null;


        const newProduct = await CreateProductService({ name, price, category, stock, image });
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await getAllProductsService();
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }   
}

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const parseData = validationProduct.updateProductSchema.parse(req.body);
        if(req.body.price)
        req.body.price = parseFloat(req.body.price);
        if(req.body.stock)
        req.body.stock = parseFloat(req.body.stock);
        const { name, price, category, stock} = parseData;
        
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const updatedProduct = await updateProductService(id, { name, price, category, stock, image });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
} 

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const deletedProduct = await deleteProductService(id);
        if(!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
        
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
}