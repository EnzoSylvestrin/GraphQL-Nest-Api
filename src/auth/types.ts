export type JwtPayload = {
    email: string;
    userId: number;
};

export type JwtPayloadRefreshToken = JwtPayload & {
    refreshToken: string;
};
