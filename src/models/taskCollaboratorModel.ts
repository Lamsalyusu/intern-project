import { Model,DataTypes } from "sequelize";
import sequelize from '../config/db';

class taskCollaborator extends Model{

}
taskCollaborator.init(
    {
      task_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },

    created_at: DataTypes.DATE,

    },

    {
    sequelize,
    modelName: "taskCollaborator",
    tableName: "task_collaborators",
    }

);
export default taskCollaborator;