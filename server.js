import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';
import mongoose from "mongoose";
// import path from 'path';


const port = process.env.PORT || 5000;

const app = express();
dotenv.config()



app.use(cors());

mongoose.connect(process.env.MONGO_DB)
.then(()=>{app.listen(port, console.log(`Server running on port ${port}`))})
.catch((err)=>{ console.log(err.message)}) 

app.use(
  '/graphql',
  graphqlHTTP({
    schema : schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

// if(process.env.NODE_ENV==="production"){
//   app.use(express.static('client/build'));
//   app.get('*',(req,res)=>{
//       res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//   })
// }