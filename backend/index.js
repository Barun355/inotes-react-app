const connectToMongo = require('./db')
const express = require('express')

connectToMongo();

const app = express()
const port = 5000


app.use(express.json());

// Avaliable routes
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/notes', require('./Routes/notes'))


app.get('/', (req, res)=>{res.send('Welcome to the Home Page')})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
