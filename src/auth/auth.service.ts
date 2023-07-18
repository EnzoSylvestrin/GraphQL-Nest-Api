import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { SignUpInput } from './dto/signup-input';
import { UpdateAuthInput } from './dto/update-auth.input';

import { PrismaService } from 'src/prisma/prisma.service';

import * as Argon from 'argon2';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    findAll() {
        return `This action returns all auth`;
    }

    findOne(id: number) {
        return `This action returns a #${id} auth`;
    }

    async singUp(signUpInput: SignUpInput) {
        const hashedPassword = await Argon.hash(signUpInput.password);

        const user = await this.prisma.user.create({
            data: {
                email: signUpInput.email,
                username: signUpInput.username,
                hashedPassword,
            },
        });

        const { accessToken, refreshToken } = await this.createTokens({
            userId: user.id,
            email: user.email,
        });

        await this.updateRefreshToken({ userId: user.id, refreshToken });

        return {
            refreshToken,
            user,
            accessToken,
        };
    }

    update(id: number, updateAuthInput: UpdateAuthInput) {
        return `This action updates a #${id} auth`;
    }

    remove(id: number) {
        return `This action removes a #${id} auth`;
    }

    async createTokens({ userId, email }: { userId: number; email: string }) {
        const accessToken = this.jwtService.sign(
            {
                userId,
                email,
            },
            {
                expiresIn: '10s',
                secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            },
        );

        const refreshToken = this.jwtService.sign(
            {
                userId,
                email,
                accessToken,
            },
            {
                expiresIn: '7d',
                secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            },
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    async updateRefreshToken({
        userId,
        refreshToken,
    }: {
        userId: number;
        refreshToken: string;
    }) {
        const hashedRefreshToken = await Argon.hash(refreshToken);

        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRefreshToken,
            },
        });
    }
}
