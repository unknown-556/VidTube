import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './index.js'

const app = express()

app.use(cors({origin:"*"}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/v3', router)


const startServer  = async () => {
    const PORT  = process.env.PORT || 2345
    
    try {
       app.listen(PORT,() => {console.log(`APP IS RUNNING ON PORT: ${PORT}`);})
    } catch (error) {
       console.log(error);
    }
 };

 startServer();

app.get("/", (req,res) => {
   res.send('API IS RUNNING')
})