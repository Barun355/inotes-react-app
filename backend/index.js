const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')

connectToMongo();

const app = express()
const port = 5000

app.use(cors());
app.use(express.json());

// Avaliable routes
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/notes', require('./Routes/notes'))


app.get('/', (req, res)=>{res.send('Welcome to the Home Page')})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
