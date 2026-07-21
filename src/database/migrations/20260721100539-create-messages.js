'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('messages',{
      id:{
        type:Sequelize.UUIDV4,
        defaultValue:Sequelize.UUIDV4,
        allowNull:false,
        primaryKey:true,
      },
      task_id:{
        type:Sequelize.UUID,
        allowNull:false,
        references:{
          model:'tasks',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      sender_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'CASCADE',
      },
      body:{
        type:Sequelize.TEXT,
        allowNull:false
      },
      created_at:{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.NOW
      },
    });
    await queryInterface.addIndex('messages',['task_id']);
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('messages');
  }
};
