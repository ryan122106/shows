const express = require("express");
const mongoose = require('mongoose');

const app = express();

//setup a middleware to handle JSON request
app.use(express.json());

async function connectToMongoDB() {
    try{
        await mongoose.connect("mongodb://localhost:27017/netflix"); 
        console.log("MongoDB is connected");
    } catch {
        console.log(error);
    }
};

connectToMongoDB();

app.get("/", (req, res) => {
    res.send("Happy coding");
});


const movieRouter = require("./routes/movie");
app.use("/movies", movieRouter);

const showRouter = require("./routes/show");
app.use("/shows", showRouter);






app.listen(5143, () => {
    console.log("server is runnig at http://localhost:5143");
});