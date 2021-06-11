'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.changeColumn('todos', 'isDone', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.changeColumn('todos', 'isDone', {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    })
  }
}
