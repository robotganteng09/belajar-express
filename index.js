const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    //   res.send('Hello World!')
    // res.json({
    //     'nama': 'Arsya',
    //     'rumah': 'Demaan',
    //     'sekolah' : 'rus'
    // })
    res.sendFile('./index.html',{root: __dirname})
})

app.get('/kontak', (req, res) => {
    //   res.send('test pertama')
    res.sendFile('./contact.html',{root: __dirname})
})

app.get('/about', (req, res) => {
    //   res.send('test pertama')
    res.sendFile('./about.html',{root: __dirname})
})

app.get('/product/:id', (req, res) => {
    res.send(`Produt id:' ${req.params.id} <br> Category ${req.query.category}`)
})

app.use('/', (req, res) => {
    res.send('<h1>404</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})