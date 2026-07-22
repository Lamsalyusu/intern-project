import { Model,DataTypes } from "sequelize";
// import { sequelize } from "../config/db";
const sequelize = require('../config/db');
class messages extends Model{}
messages.init(
    {
        id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    task_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sender_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
  },
  
  {
    sequelize,
    modelName: "Message",
    tableName: "messages",
    }
)
export default messages;