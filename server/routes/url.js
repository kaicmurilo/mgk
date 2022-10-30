const express = require('express')
const mongodb = require('mongodb')
const Link = require('../models/links')
const router = express.Router();


router.get('/:code', async (req, res) => {
    const code = req.params.code;
    const resultado = await Link.findOne({
        where: {
            code
        }
    })
    if (!resultado) return res.sendStatus(404);
    resultado.hits++;
    await resultado.save();
    res.send(resultado)
})
//get
router.get('/', async (req, res) => {
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
    const url = req.body.text
    const code = generateCode();
    const resultado = await Link.create({
        url,
        code
    })
    res.status(201).send();
})


//delete
router.delete('/delete/:id', async (req, res) => {
    var idDel = req.params.id
    await Link.destroy({
        where: {
            id: idDel
        }
    }).then(function (rowDeleted) { // rowDeleted will return number of rows deleted
        if (rowDeleted === 1) {
            res.status(200).send('Deletado com sucesso')
        }
    }, function (err) {
        res.status(500).send('Erro ao deletar')
    });
})


// mongodb+srv://<username>:<password>@cluster0.pc5st11.mongodb.net/?retryWrites=true&w=majority
// async function loadPostCollection() {
//     const client = await mongodb.MongoClient.connect('mongodb+srv://kaicmurilo:uakC3n5Yc0NJEgRs@cluster0.b128qjj.mongodb.net/?retryWrites=true&w=majority', {
//         useNewUrlParser: true
//     })

//     return client.db('vue_express').collection('posts')
// }
module.exports = router;