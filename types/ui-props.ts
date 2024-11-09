import { PERMISSION_TYPES } from '@/constants/permission-types';

export type SubHeadingProps = {
    label?: string;
};

export const statusBadgeColor = (isDelete: boolean | undefined) => {
    const color = isDelete ? 'danger' : 'success';
    return color;
};

export const permissionTypeBadgeColor = (type: string) => {
    const colorMapping: Record<string, string> = {
        [PERMISSION_TYPES.PERMISSION]: 'primary',
        [PERMISSION_TYPES.ROLE]: 'warning',
        [PERMISSION_TYPES.USER]: 'info',
        [PERMISSION_TYPES.CLIENT]: 'secondary',
        [PERMISSION_TYPES.EMPLOYEE]: 'success',
        [PERMISSION_TYPES.MEMBER]: 'danger',
        [PERMISSION_TYPES.STUDENT]: 'light',
        [PERMISSION_TYPES.REPORT]: 'dark',
        [PERMISSION_TYPES.SETTING]: 'muted',
        [PERMISSION_TYPES.AUTH]: 'secondary',
    };
    return colorMapping[type] || 'default'; // Fallback color if type is not found
};
