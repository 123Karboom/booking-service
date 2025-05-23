const mongoose = require('mongoose');

//connect to mongodb
const connectDB = async () => {
  try 
  { 
    await mongoose.connect(process.env.MONGODB_URL_DEPLOYMENT)
    console.log('Connected to MongoDB');
  }catch(error)
  {
    console.log('Error connecting to MongoDB', error);
    process.exit(1);
  }
}
module.exports = connectDB;
