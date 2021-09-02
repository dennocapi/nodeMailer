const express = require('express')
const app = express()
const mailRoute = require('./routes/mail')
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Nodejs Mail sender')
})
app.use('/mail', mailRoute)

const port = process.env.PORT || 8000
app.listen(port,() =>{
    console.log(`Server running on port ${port}`)
})