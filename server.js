;const express = require("express")
const mongoose = require("mongoose")
const upload = require("./upload")
const path = require("path")
const Products = require("./model")



const app = express()
//contect to ecommerce database in mongodb server
mongoose.connect("mongodb://localhost:27017/ecommerce",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected!'));


//middlewares
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))


//api endpoints
//create product
app.post('/api/products/create',upload.single('image'), async (req,res) => {

    const data = await new Products({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        quantity : req.body.quantity,
        image : `/uploads/${req.file.filename}`,

    })

    const product = await data.save()

    return res.status(201).json({
        status: 201,
        successful: true,
        message: "product Created successfully",
        product
    })
})
//create product

//list products
app.get('/api/products/',async (req,res) => {
    const products = await Products.find()
    return res.status(200).json({
        status: 200,
        successful: true,
        products
    })
})
//list products

//delete product
app.delete('/api/products/delete/:id',async (req,res) => {
    const product_id = req.params.id
    const product = await Products.findOne({_id:product_id})
    if(product){
        await Products.deleteOne({_id:product_id})
        return res.status(200).json({
            status: 200,
            successful: true,
            message: "product deleted successfully",
        })
    }

    return res.status(404).json({
        status: 404,
        successful: false,
        message: "product not found",
    })

})
//delete product





app.listen(7000,() => console.log("server is listening on port 7000"))