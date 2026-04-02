const mongoose = require("mongoose")

const BookSchema = new  mongoose.Schema({
    title: {
        type: String,
    },
    author:{
        type: String,
    },
    publishedYear:{
        type: String,
    },
    genre:[{
        type: String,
    }],
    language:{
        type: String,
    },
    country:{
        type: String,
    },
    rating:{
        type: Number,
    },
    summary:{
        type: String,
    },
    coverImageUrl:{
        type: String,
    },   
},
{
        timestamps: true
    }
)

const Book = mongoose.model("Book", BookSchema)

module.exports = Book