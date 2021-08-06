const { User } = require('../database/models')

function  exist (evaluateField, dataToEvaluate){
  return  User.findOne({where: {[evaluateField] : dataToEvaluate}})
}

module.exports = { exist }