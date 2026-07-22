// import { Model } from "sequelize";
const Model = require('sequelize');
import { DataTypes } from "sequelize";
import sequelize from "../config/db";
class user extends Model{}

user.init(
    {
        

},

    {
        sequelize,
        modelName:"user",
        tableName:"users",
    }

);
export default user;
