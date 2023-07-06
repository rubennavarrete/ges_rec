import * as dotenv from 'dotenv';
dotenv.config();

export const jwtVariables = {
    jwtSecret:process.env.JWT_SECRET,
    jwtExpiresIn:process.env.JWT_EXPIRES_IN
};