const express = require('express')
const mongodb = require('mongodb')

const router = express.Router();

//get
router.get('/', async (req, res) => {
    console.log('get posts')
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
    console.log('delete posts')
    const posts = await loadPostCollection();
    await posts.deleteOne({
        _id: mongodb.ObjectId(req.params.id)
    })
    res.status(200).send()
})



async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://node-teste:con3ct1@node-study.mkkk17a.mongodb.net/Node-study', {
        useNewUrlParser: true
    })

    return client.db('vue_express').collection('posts')
}
module.exports = router;