import app from "./app.js" 
import { connectToDatabase } from "./db/connection.js";
import {config} from 'dotenv';

const port = process.env.PORT
//connections and listeners
connectToDatabase().then( 
     ()=> {
          app.listen(port,() => console.log("Server Open & connected to database ✔"));
          }
).catch((err)=> console.log(err))
