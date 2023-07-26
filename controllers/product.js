const Product = require("../models/products");
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort("name").select('name price').limit(10).skip(1)
  //option i means case insensitive
  // throw new Error('Testing async errors')
  res.status(200).json({ products, no_of_hits: products.length });
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort , fields} = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === true ? "true" : "false";
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  let result = Product.find(queryObject);
  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    resut = result.sort("createdAt");
  }
  //selecting only particular fields
  if(fields)
  {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const products = await result;
  res.status(200).json({ products, no_of_hits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
