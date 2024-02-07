
import mongoose from 'mongoose';

import express from 'express';


import { DB_NAME } from './constants.js';


const app = express();
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


// ... other configurations and routes

// Start the Express server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});


