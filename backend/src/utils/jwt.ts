
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';


dotenv.config();

// access token and refersh token secrets from environment variables
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// function to generate access token with userId and role as payload
const generateAccessToken = (userId: number, role: string) => {
    if (!ACCESS_TOKEN_SECRET) {
        throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variables");
    }

    return jwt.sign({ userId, role }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}


// function to generate refresh token with userId as payload
const generateRefreshToken = (userId: number) => {
    if (!REFRESH_TOKEN_SECRET) {
        throw new Error("REFRESH_TOKEN_SECRET is not defined in environment variables");
    }
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

export {
    generateAccessToken,
    generateRefreshToken
};