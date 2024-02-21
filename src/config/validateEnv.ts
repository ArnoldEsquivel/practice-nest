import * as Joi from 'joi';

export const valitateEnv = Joi.object({
    // NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
    PORT: Joi.number().default(3000),
    ORIGIN_CORS: Joi.string().required(),
    API_KEY: Joi.string().required(),
    MY_SQL_HOST: Joi.string().required(),
    MY_SQL_PORT: Joi.number().required().default(3306),
    MY_SQL_USER: Joi.string().required(),
    MY_SQL_PASSWORD: Joi.string().required(),
    MY_SQL_DATABASE: Joi.string().required(),
    MONGO_HOST: Joi.string().required(),
    MONGO_PORT: Joi.number().required().default(27017),
    MONGO_USER: Joi.string().required(),
    MONGO_PASSWORD: Joi.string().required(),
    MONGO_DATABASE: Joi.string().required(),
})