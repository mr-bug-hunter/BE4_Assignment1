const express = require("express")
const app = express()

const cors = require("cors")
app.use(cors())

const {initializeDatabase} = require("./db/db.connect")
const Books = require("./models/books.models")


app.use(express.json())
initializeDatabase()

const books = {
  "title": "Lean In",
  "author": "Sheryl Sandberg",
  "publishedYear": 2012,
  "genre": ["Non-fiction", "Business"],
  "language": "English",
  "country": "United States",
  "rating": 4.1,
  "summary": "A book about empowering women in the workplace and achieving leadership roles.",
  "coverImageUrl": "https://example.com/lean_in.jpg"
};

async function createBooks(newBooks){
    try{
        const book = new Books(newBooks)
        const saveBooks = await book.save()
        return saveBooks
    }catch(error){
        console.log(error)
    }
} 

app.post("/books", async (req, res)=>{
    try{
        const savedBook = await createBooks(req.body)
        res.status(200).json({message: "Book added successfully.", book : savedBook})
    }catch(error){
        res.status(500).json({error: "Failed to Add Books.", error})
    }
})

async function allbooks(){
    try{
        const allbooks = await Books.find()
        return allbooks
    }catch(error){
        console.log(error)
    }
}

app.get("/books", async (req, res)=>{
    try{
        const book = await allbooks()
        if(book.length != 0){
            res.status(200).json({message: "successful", book})
        }else{
            res.status(404).json({error: "No books found."})
        }
        
    }catch(error){
        res.status(500).json({error: "Failed to fetch data."})
    }
})

async function findbytitle(titleName){
    try{
        const title = await Books.findOne({ title: titleName})
        return title
    }catch(error){
        console.log(error)
    }
}

app.get("/books/:title", async (req, res)=>{
    try{
        const bookByTitle = await findbytitle(req.params.title)
        if(bookByTitle.length != 0){
            res.status(200).json({message: "Title found", bookByTitle})
        }else{
            res.status(404).json({error: "Not found"})
        }
    }catch(error){
        res.status(500).json({error: "Book details not found."})
    }
}) 

async function allbooksAuthor(authorName){
    try{
        const booksAuthor = await Books.find({author: authorName})
        return booksAuthor
    }catch(error){
        console.log(error)
    }
}

app.get("/books/author/:authorName", async (req, res)=>{
    try{
        const author = await allbooksAuthor(req.params.authorName)
        if(author.length != 0){
            res.status(200).json({message: "Author Found.", author})
        }else{
            res.status(404).json({error: "error data not found."})
        }
    }catch(error){
        res.status(500).json({error: "Error details not found."})
    }
})

async function genreBusiness(businessGenre){
    try{
        const genre = await Books.find({genre: businessGenre})
        return genre
    }catch(error){
        console.log(error)
    }
}

app.get("/books/genre/:genreName", async (req, res)=>{
    try{
        const nameGenre = await genreBusiness(req.params.genreName)
        if(nameGenre.length != 0){
            res.status(200).json({message: "Genre Found.", nameGenre})
        }else{
            res.status(404).json({error: "Data not found."})
        }
    }catch(error){
        res.status(500).json({error: "Error details not found."})
    }
})

async function releasedYear(releaseYear){
    try{
        const release = await Books.find({publishedYear: releaseYear})
        return release
    }catch(error){
        console.log(error)
    }
}

app.get("/books/releaseYear/:released", async (req, res)=>{
    try{
        const releaseYear = await releasedYear(req.params.released)
        if(releaseYear.length != 0){
            res.status(200).json({message: "Release Year Found.", releaseYear})
        }else{
            res.status(404).json({error: "Error data not found."})
        }
    }catch(error){
        res.status(500).json({error: "Error not found."})
    }
})

async function  titleIdUpdate(bookId, updateData){
    try{
        const rating =  await Books.findByIdAndUpdate(bookId , updateData, {new: true})
        return rating
    }catch(error){
        console.log(error)
    }
}

app.post("/books/rating/:ratingId", async (req, res)=>{
    try{
        const updaterating = await titleIdUpdate(req.params.ratingId , req.body)
        if(updaterating){
            res.status(200).json({message: "Book updated successfully", updaterating})
        }else{
            res.status(404).json({error: "Book does not exist."})
        }
    }catch(error){
        res.status(500).json({error: "Error Data not found."})
    }
})

async function updatePublisherYear(publishId, updateData){
    try{
        const publishyear = await Books.findByIdAndUpdate(publishId, updateData, {new:true})
        return publishyear
    }catch(error){
        console.log(error)
    }
}

app.post("/books/publishedYear/:publishedId", async (req, res)=>{
    try{
        const published = await updatePublisherYear(req.params.publishedId, req.body)
        if(published){
            res.status(200).json({message: "Publish Year Successfully", published})
        }else{
            res.status(404).json({error: "Book does not exist."})
        }
    }catch(error){
        res.status(500).json({error: "Error not found."})
    }
})

async function deleteid(bookId){
    try{
        const deleteBook = await Books.findByIdAndDelete(bookId, {new: true})
        return deleteBook
    }catch(error){
        console.log(error)
    }
}

app.delete("/books/:deleteId", async (req, res)=>{
    try{
        const deleteData = await deleteid(req.params.deleteId)
        if(deleteData){
            res.status(200).json({message: "Data deleted successfully.", deleteData})
        }else{
            res.status(404).json({error: "Book not found."})
        }
    }catch(error){
        res.status(500).json({error: "Error not found."})
    }
})
const PORT = 3050
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})