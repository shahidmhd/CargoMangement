import express from "express";
const app = express();
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import UserRouters from './routes/UserRouter.js'
import mongoose from 'mongoose'

dotenv.config()


const port = process.env.PORT;
app.use(express.json());
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))



app.use('/api/users',UserRouters)

// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("\x1b[33m%s\x1b[0m", "Database connected successfully"); // Yellow color code: \x1b[33m
  }).catch((error) => {
    console.log("\x1b[31m%s\x1b[0m", `Database connection error: ${error}`); // Red color code: \x1b[31m
  });
  



app.listen(port, () => {
  console.log("\x1b[34m%s\x1b[0m", `Server listening at port ${port}`);
});
