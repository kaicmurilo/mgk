const express = require('express')
const mongodb = require('mongodb')
const Link = require('../models/links')
const router = express.Router();

//get
router.get('/', async (req, res) => {
    console.log('get url')
    res.send(await Link.findAll({}))
})

function generateCode() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWYXZabcdefghijklmnopqrstuvwyxz0123456789';
    for (let i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text
}

//add
router.post('/new', async (req, res) => {
    // const url = await loadPostCollection();
    // await posts.insertOne({
    //     url: req.body.text,
    //     createAt: new Date()
    // })
    const url = req.body.text
    const code = generateCode();
    console.log('http://localhost:3000/' + code)
    const resultado = await Link.create({
        url,
        code
    })
    console.log(resultado)
    res.status(201).send();
})


//delete
// router.delete('/:id', async (req, res) => {
//     console.log('delete posts')
//     const posts = await loadPostCollection();
//     await posts.deleteOne({
//         _id: mongodb.ObjectId(req.params.id)
//     })
//     res.status(200).send()
// })


// mongodb+srv://<username>:<password>@cluster0.pc5st11.mongodb.net/?retryWrites=true&w=majority
// async function loadPostCollection() {
//     const client = await mongodb.MongoClient.connect('mongodb+srv://kaicmurilo:uakC3n5Yc0NJEgRs@cluster0.b128qjj.mongodb.net/?retryWrites=true&w=majority', {
//         useNewUrlParser: true
//     })

//     return client.db('vue_express').collection('posts')
// }
module.exports = router;