import 'express-async-errors'
import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()


import {connectDB} from './db/connect.js'

import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

import { notFoundMiddleware } from './middleware/not-found.js'
import { errorHandlerMiddleware } from './middleware/error-handler.js'

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Welcome!')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 4000



const start = async() =>{
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=>{
            console.log(`server is listening on port ${port}...`)
        })
    }catch(error){
        console.log(error)
    }
}


start()