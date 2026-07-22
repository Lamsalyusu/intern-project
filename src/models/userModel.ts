// import { Model } from "sequelize";
// const {Sequelize,DataTypes,Model} = require('sequelize');
import {Sequelize,DataTypes,Model} from "sequelize"
// import { DataTypes } from "sequelize";
// import sequelize from "../config/db";
const sequelize = require('../config/db');
class user extends Model{}

user.init(
    {
      id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
},

    {
        sequelize,
        modelName:"user",
        tableName:"users",
    }

);
export default user;
