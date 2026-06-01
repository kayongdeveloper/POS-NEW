import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { loginSchema, type LoginInput } from "../validation/authValidation.js";


export class AuthService {

    async getProfile(userId: number) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                username: true,
                role: true,
                createdAt: true

            }
        });

        if (!user) {
            throw new Error("User tidak ditemukan");
        }

        return user;
    }


    // login method to authenticate user and generate tokens
    async login(inputData: LoginInput) {
        // validate input using zod schema
        const validatedData = loginSchema.parse(inputData);

        // find user by username 
        const user = await prisma.user.findUnique({
            where: {
                username: validatedData.username
            }
        });

        if (!user) {
            throw new Error("Invalid username or password");
        }

        //  validate password using bcrypt
        const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);

        if (!isPasswordValid) {
            throw new Error("Username atau password salah");
        }

        const accessToken = generateAccessToken(user.id, user.role);
        const refreshToken = generateRefreshToken(user.id);

        // simpan refresh token ke database untuk keperluan invalidasi di masa depan
        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id
            }
        });

        // return user data dan tokens untuk dikirim ke client
        return {
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                role: user.role
            },
            accessToken,
            refreshToken
        }
    }


    // refresh token method — rotasi token lama dan terbitkan pasangan token baru
    async refresh(oldRefreshToken: string) {
        // 1. Cek apakah refresh token ada di database
        const storedToken = await prisma.refreshToken.findUnique({
            where: { token: oldRefreshToken },
            include: { user: true }
        });

        if (!storedToken) {
            throw new Error("Refresh token tidak valid atau sudah digunakan");
        }


        let payload: { userId: number };
        try {
            payload = verifyRefreshToken(oldRefreshToken);
        } catch {

            await prisma.refreshToken.delete({ where: { token: oldRefreshToken } });
            throw new Error("Refresh token kedaluwarsa atau tidak valid");
        }

        const user = storedToken.user;


        await prisma.refreshToken.delete({ where: { token: oldRefreshToken } });


        const newAccessToken = generateAccessToken(user.id, user.role);
        const newRefreshToken = generateRefreshToken(user.id);


        await prisma.refreshToken.create({
            data: {
                token: newRefreshToken,
                userId: user.id
            }
        });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }


}

