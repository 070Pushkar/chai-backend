
import mongoose from 'mongoose';

import express from 'express';

import router from '../src/routes/user.routes.js'

import { DB_NAME } from './constants.js';

import {Router} from 'express';


const app = express();
app.use(express.json())
const MONGODB_URI = "mongodb+srv://vipul:vipul2214@cluster0.ua6uwuw.mongodb.net/test?retryWrites=true&w=majority"
// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connectToMongoDB();

app.use('/users',router);

app.get('/',(req,res) => {
  res.send("hi");
})


// ... other configurations and routes

// Start the Express server
const port = process.env.PORT || 8000;
app.listen(8000, () => {
  console.log(`Server is running at port ${port}`);
});


