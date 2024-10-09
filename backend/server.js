import express from 'express'
import mongoose from 'mongoose';
import Article from './models/blog.js';
import dotenv from 'dotenv';
const app = express()


app.use(express.json());
dotenv.config();

const port = 9000

// getting-started.js


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('connect success')

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


// app.get('/article', (req,res)=>{
//     const article = new  Article({
//         title: 'how to be good',
//         body: 'this is my bloog'
//     })
//     article.save()
//     .then((result)=>{
//         res.send(result)
//     })

// })

app.get('/article', (req,res)=>{
    Article.find()
    .then(result=>{
        res.send(result)
    })
})  
app.get('/article/:id', (req,res)=>{
    Article.findOne()
    .then(result=>{
        res.send(result)
    })
})  

app.post('/article', (req, res) => {
    const article = new Article({
        title: req.body.title,
        body: req.body.body,
        editor: req.body.editor,
        isEmployee: req.body.isEmployee,
    });

    article.save()
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.error('Error saving article:', error);
            res.status(500).send('Error saving article');
        });
});

app.patch('/update/:id', (req,res)=>{
    const {id} = req.params
    Article.findByIdAndUpdate(id ,req.body,{new:true, runValidators:true})
    .then((result)=>{
        res.send(result)
    })
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    Article.deleteOne({ _id: id }) 
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).send('Article not found'); 
            }
            res.send('Article deleted successfully');
        })
        .catch((error) => {
            console.error('Error deleting article:', error);
            res.status(500).send('Error deleting article');
        });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

