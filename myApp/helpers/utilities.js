const { User } = require('../database/models')
let accesos = 0
function getUserByDni(dni) {
  console.log('ejecuto user by dni')
  const user = User.findOne({
    where: { dni }
  })

  return user
}

function getUserById( id ){
  accesos++
  console.log(`ejecuto user by id ${accesos}`)
  const user = User.findByPk(id)
  return user
}

module.exports = { getUserByDni, getUserById }