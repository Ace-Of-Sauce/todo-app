import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String
});

const Todo = mongoose.model('Todo', todoSchema);

mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get("/todos", async(req, res)=>{
   const todos = await Todo.find({}).exec();
    if(todos){
        res.status(200).json(todos)
    }
    else{
        res.status(404);
    }
});

app.post("/todos", (req, res)=>{
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    });

    todo.save().then((todo) => {
        if (todo) {
            res.status(200).json({ todo });
            
        } else {
            res.status(500).json({ message: err.message });
        }
    })
});

app.post("/todos/complete", (req, res)=>{
    var title = req.body.title
   Todo.findOneAndUpdate({title: title}, {
        status: "completed"
    }, {new: true}).then((todo)=>{
        if (todo) {
            res.status(200).json(todo);
        }
        else {
            res.status(500).send("could not update todo")
        }
    });
    
})

app.listen(4000, ()=>{
    console.log("Server is listening on port 4000")
})

