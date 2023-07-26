const Product=require('../models/products');
const getAllProductsStatic= async (req,res)=>{
    const products=await Product.find({featured:true})
    // throw new Error('Testing async errors')
    res.status(200).json({products, no_of_hits: products.length})
}
const getAllProducts= async (req,res)=>{
    const products=await Product.find(req.query)
    res.status(200).json({products, no_of_hits:products.length})
}

module.exports = {getAllProductsStatic, getAllProducts}