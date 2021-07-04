const joi = require('joi')

const UserValidator = {
  validateLoginFacebook: (data) => {
    const validate = joi.object({
      username: joi.string().required(),
      email: joi.string().email().required(),
      imgUrl: joi.string().required()
    })

    return validate.validateAsync(data)
  },

  validateId: (data) => {
    const validate = joi.object({
      id: joi.string().required()
    })

    return validate.validateAsync(data)
  }
}
module.exports = UserValidator