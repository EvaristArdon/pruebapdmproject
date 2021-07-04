'use strict';

module.exports = {
    PORT: process.env.PORT,
    DB: process.env.DB,
    ROUNDS: process.env.BCRYPT_ROUNDS,
    KEY_SESSION: process.env.KEY_SESSION,
    KEY_TOKEN: process.env.KEY_TOKEN,
    JWT_EXP: process.env.JWT_EXP,
    JWT_ALG: process.env.JWT_ALG,
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    URL_ENDPOINT: process.env.URL_ENDPOINT,
    IMAGE_ADMIN: process.env.IMAGE_ADMIN,
    IMAGE_CLIENT: process.env.IMAGE_CLIENT,
    IMAGE_POST: process.env.IMAGE_POST
}
