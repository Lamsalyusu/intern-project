import sequelize from "./config/db";
async function connectDB(){
    try{
        await sequelize.authenticate();
        console.log("DB Connected successfully");
    }
    catch(error){
        console.log("Error while connecting DB",error);
    }
}
connectDB();

const dotenv = require('dotenv');
dotenv.config();
// import 
// const PORT = process.env.PORT ||3000;
// app.listen(PORT)