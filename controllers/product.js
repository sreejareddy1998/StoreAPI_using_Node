const Product=require('../models/products');
const getAllProductsStatic= async (req,res)=>{
    const products=await Product.find({}).sort('-name price')
    //option i means case insensitive
    // throw new Error('Testing async errors')
    res.status(200).json({products, no_of_hits: products.length})
}
const getAllProducts= async (req,res)=>{
    const {featured, company, name}= req.query;
    const queryObject={}
    if(featured){
        queryObject.featured= featured=== true? 'true':'false'
    }
    if(company){
        queryObject.company= company
    }
    if(name)
    {
        queryObject.name={ $regex:name, $options: 'i'}
    }
    const products=await Product.find(queryObject)
    res.status(200).json({products, no_of_hits:products.length})
}

module.exports = {getAllProductsStatic, getAllProducts}