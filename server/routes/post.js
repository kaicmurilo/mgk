const express = require('express')
const mongodb = require('mongodb')

const router = express.Router();

//get
router.get('/', async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray())
})

//add
router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createAt: new Date()
    })

    res.status(201).send();
})


//delete
router.delete('/:id', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({
        _id: mongodb.ObjectId(req.params.id)
    })
    res.status(200).send()
})


// mongodb+srv://<username>:<password>@cluster0.pc5st11.mongodb.net/?retryWrites=true&w=majority
async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://kaicmurilo:uakC3n5Yc0NJEgRs@cluster0.b128qjj.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })

    return client.db('vue_express').collection('posts')
}
module.exports = router;