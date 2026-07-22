// import { Model } from "sequelize";
const Model = require('sequelize');
import { DataTypes } from "sequelize";
import sequelize from "../config/db";
class task extends Model{}

task.init(
    {
        id:{
            type:DataTypes
        }

},

    {
        sequelize,
        modelName:"task",
        tableName:"tasks",
    }

);
export default task;
