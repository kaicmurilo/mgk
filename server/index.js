(async () => {
    const express = require('express')
    const bodyParser = require('body-parser')
    const cors = require('cors')
    const path = require('path');
    const database = require('./db')

    const Link = require('./models/links')
    database.sync();


    const app = express();

    //Middleware
    app.use(bodyParser.json())
    app.use(cors())

    const posts = require('./routes/post')
    app.use('/api/posts', posts)


    const urls = require('./routes/url')
    app.use('/api/urls', urls)


    // handle production
    if (process.env.NODE_ENV === 'production') {
        //static folder

        const diretorio = path.basename(__dirname);
        app.use(express.static(diretorio + '/public/'))

        //handle spa
        app.get(/.*/, (req, res) => res.sendFile(diretorio + '/public/index.html'))
    }

    const port = process.env.PORT || 5000;

    app.listen(port, () => console.log(`Server inciou em porta ${port}`))
})();

