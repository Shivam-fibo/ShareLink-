 import express from 'express'
import router from './routes/routes.js'
import cors from 'cors'
import DBConnetion from './database/db.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';


 const app = express()
 dotenv.config()

 app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
  }));
  
app.use(express.json())
app.use(cookieParser());

app.use('/', router)


 const PORT = 8000

DBConnetion()
 app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

 