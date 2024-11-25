const mongoose = require("mongoose")


const ProductSchema = mongoose.Schema(
    {

        name : {
            type : String,
            required : true,
            maxlength : 50,
        },

        description : {
            type : String,
            required : true,
            maxlength : 250,
        },

        price : {
            type : Number,
            required : true,
        },

        quantity : {
            type : Number,
            required : true,
        },


        category : {
            type : String,
            enum : ['Fashion','Electronics','Home','Health','Food','Media']
        },

        image : {
            type : String,
            required : true,
        },

    }
)


const Products = mongoose.model("Products",ProductSchema,"Products")
module.exports = Products