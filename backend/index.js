 import express from 'express'
import router from './routes/routes.js'
import cors from 'cors'
import DBConnetion from './database/db.js'
 const app = express()
 app.use(cors({
    origin: 'https://file-sharing-application-2p34.vercel.app', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Adjust methods as necessary
    credentials: true, // If you need to allow credentials
  }));
app.use('/', router)


 const PORT = 8000

DBConnetion()
 app.listen(PORT, () => console.log(`Server is running on port https://file-sharing-application-one.vercel.app/:${PORT}`))

 