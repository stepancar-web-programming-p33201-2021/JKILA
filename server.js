const express = require('express')
const path = require("path")
const config = require("config")
const postgres = require("postgres")

const app = express()

const PORT = config.get('port')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/public/index.html')
})

/*function start() {
    try {
        postgres.connect(config.get(),{

        })
    } catch (e) {
        
    }
}*/
app.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}!`));

