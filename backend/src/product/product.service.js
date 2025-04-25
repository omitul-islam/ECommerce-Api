import productModel from "./product.model.js";

export const CreateProductService = async  ({ name, price, category, stock, image }) => {
    const newProduct = new productModel({ name, price, category, stock, image });
    await newProduct.save();
    return newProduct;
}   

export const getAllProductsService = async () => {
    const products = await productModel.find({});
    return products;
}

export const updateProductService = async (id, { name, price, category, stock, image }) => {
       const product = await productModel.findById(id)   
       console.log(product);
       if(!product) {
           return null;
       }
       if(name !== undefined)product.name = name;
       if(price !== undefined )product.price = price;
       if(category !== undefined)product.category = category;
       if(stock !== undefined)product.stock = stock;
       if(image !== undefined)product.image = image;
       console.log(product);
       
       await product.save();
       return product;
}

export const deleteProductService = async (id) => {
    const product = await productModel.findById(id);
    if(!product) {
        return null;
    }
    const deletedProduct = await productModel.findByIdAndDelete(id);
    return deletedProduct;
}
