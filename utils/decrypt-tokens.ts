import { JwtConfigs } from '@/configs/app-configs';
import jwt from 'jsonwebtoken';

export const decryptToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, JwtConfigs.JWT_SECRET_KEY);
        return decoded; // This should contain the decrypted permissions
    } catch (error) {
        console.error('Failed to decrypt permissions:', error);
        return null;
    }
};
