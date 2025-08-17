import express from 'express'
const app=express()
import cors from 'cors'
import connection from './db/Connection.js'
import account_holder_router from './router/accountHolder.js'
import './modal/accountholder_model.js';
const port=3000

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World! Mahetab khan')
})

app.use('/bank',account_holder_router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})