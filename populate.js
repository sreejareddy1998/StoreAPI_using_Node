require('dotenv').config()

const connectDB= require('./db/connect');
const Product=require('./models/products');

const jsonProducts=require('./products.json');

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany();
        await Product.create(jsonProducts) // we are sending data from prducts.json to model products
        console.log('Success.....');
        process.exit(0) // 0 means success , process.exit() to exit the process
    }catch(error)
    {
        console.log(error);
        process.exit(1) // 1 means fail
    }
}
start()