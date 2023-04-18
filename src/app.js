const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));

// Middlewares
app.use(express.json());
// app.get("/", (req, res)=>{
//     res.send("hello");
// })

// Write GET endpoint for sending product to the client here
// Endpoint - /api/v1/products/:name/:price
app.get("/api/v1/products/:name/:price", (req, res) => {
    const {name, price} = req.params;
    let product =products.find((product)=> product.name === name && product.price ===parseInt(price));
    if(!product){
        res.status(404).json({ status: "failed", message: "Product not found!" });
    }else{
          
        res.status(200).json({ status: "success",
        message: "Product fetched successfully",
        data:{
            product
        }
    })


    }
})

module.exports = app;
