'use strict'
const bcrypt = require('bcryptjs')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userId = await queryInterface.bulkInsert('Users', [{
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: bcrypt.hashSync(SEED_USER.password, bcrypt.genSaltSync(10)),
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    await queryInterface.bulkInsert('todos',
      Array.from({ length: 10 }, (_, i) => {
        return {
          name: `name-${i}`,
          UserId: userId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }))
  },

  down: async (queryInterface, Sequelize) => {
    return await Promise.all([
      queryInterface.bulkDelete('todos'),
      queryInterface.bulkDelete('Users')
    ])
  }
}
