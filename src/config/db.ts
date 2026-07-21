const  dotenv  =  require("dotenv");
const {Sequelize} = require("sequelize");

dotenv.config();
const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect:"postgres",
    logging:false,
});
export default sequelize;


