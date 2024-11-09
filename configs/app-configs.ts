export const ApiRouteConstants = {
    MODULE: process.env.NEXT_PUBLIC_BASE_API_MODULE as string,
    BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL as string,
};

export const JwtConfigs = {
    // JWT
    JWT_SECRET_KEY: process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string,
    JWT_EXPIRE_TIME: process.env.NEXT_PUBLIC_JWT_EXPIRE_TIME as string,
};
