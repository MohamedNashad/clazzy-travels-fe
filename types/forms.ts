export type RegisterFormData = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
};

export type LoginFormData = {
    email: string;
    password: string;
};

export type PermissionType = {
    _id: string;
    code: string;
    name: string;
    type: string;
    description: string;
    isDelete?: boolean;
    createdBy?: object;
    updatedBy?: object;
};

export type RoleType = {
    _id: string;
    slug: string;
    name: string;
    rank: string | number;
    description: string;
    isDelete?: boolean;
    createdBy?: object;
    updatedBy?: object;
};

export type UserType = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isDelete?: boolean;
    createdBy?: object;
    updatedBy?: object;
};

export type Features = {
    tie: string;
    bow: string;
    doubleStich: string;
    patternDesign: number;
    checkedDesign: number;
};
