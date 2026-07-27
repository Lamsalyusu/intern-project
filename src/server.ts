import dotenv from 'dotenv';
dotenv.config(); 

import  sequelize  from "./config/db";
import app from './app';

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("DB Connected successfully");
  } catch (error) {
    console.log("Error while connecting DB", error);
  }
}

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});