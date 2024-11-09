'use client';
import React, { useState } from 'react';
import { LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { RegisterFormData } from '@/types/forms';
import IconMail from '@/components/icon/icon-mail';
import IconUser from '@/components/icon/icon-user';
import { FrontEndRoutes } from '@/constants/routes';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppContext } from '@/contexts/app-context';
import { userRegisterSchema } from '@/validations/user';
import * as UserServices from '@/services/user-services';
import { useMutation, useQueryClient } from 'react-query';
import { QueryKeyConstants } from '@/constants/query-keys';
import IconLockDots from '@/components/icon/icon-lock-dots';

const RegisterForm = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const validationSchema = userRegisterSchema;

    const [loading, setLoading] = useState<boolean>(false);

    const { control, formState, handleSubmit, reset, setValue, resetField } = useForm<RegisterFormData>({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
        },
    });

    const errors: object | any = formState.errors;

    const getFormErrorMessage = (name: string) => {
        return errors[name] ? <small className="p-1 text-sm text-red-600">{errors[name].message}</small> : <small className="p-1 text-sm text-red-600">&nbsp;</small>;
    };

    const mutation = useMutation(UserServices.register, {
        onSuccess: async () => {
            showToast({ message: 'Registration Success!', icon: 'success', position: 'top-end' });
            await queryClient.invalidateQueries(QueryKeyConstants.GET_VALIDATE_TOKEN_KEY);
            router.push(FrontEndRoutes.DASHBOARD_URL); // Redirect after token validation
        },
        onError: (error: Error) => {
            showToast({ message: error.message, icon: 'error', position: 'top-end' });
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form className="space-y-5 dark:text-white" onSubmit={onSubmit}>
            <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                    <>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <div className="relative text-white-dark">
                                <input
                                    id={field.name}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    type="text"
                                    placeholder="Enter First Name"
                                    className="form-input ps-10 placeholder:text-white-dark"
                                />
                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                    <IconUser fill={true} />
                                </span>
                            </div>
                        </div>
                        {getFormErrorMessage(field.name)}
                    </>
                )}
            />
            <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                    <>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <div className="relative text-white-dark">
                                <input
                                    id={field.name}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    type="text"
                                    placeholder="Enter Last Name"
                                    className="form-input ps-10 placeholder:text-white-dark"
                                />
                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                    <IconUser fill={true} />
                                </span>
                            </div>
                        </div>
                        {getFormErrorMessage(field.name)}
                    </>
                )}
            />
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <>
                        <div>
                            <label htmlFor="Email">Email</label>
                            <div className="relative text-white-dark">
                                <input
                                    id={field.name}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    type="email"
                                    placeholder="Enter Email"
                                    className="form-input ps-10 placeholder:text-white-dark"
                                />
                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                    <IconMail fill={true} />
                                </span>
                            </div>
                        </div>
                        {getFormErrorMessage(field.name)}
                    </>
                )}
            />

            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <>
                        <div>
                            <label htmlFor="Password">Password</label>
                            <div className="relative text-white-dark">
                                <input
                                    id={field.name}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    type="password"
                                    placeholder="Enter Password"
                                    className="form-input ps-10 placeholder:text-white-dark"
                                />
                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                    <IconLockDots fill={true} />
                                </span>
                            </div>
                        </div>
                        {getFormErrorMessage(field.name)}
                    </>
                )}
            />

            <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                    <>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="relative text-white-dark">
                                <input
                                    id={field.name}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    type="password"
                                    placeholder="Enter Confirm Password"
                                    className="form-input ps-10 placeholder:text-white-dark"
                                />
                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                    <IconLockDots fill={true} />
                                </span>
                            </div>
                        </div>
                        {getFormErrorMessage(field.name)}
                    </>
                )}
            />

            <button type="submit" disabled={loading} className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                {loading ? <LoaderIcon className="animate-spin" /> : 'Sign Up'}
            </button>
        </form>
    );
};

export default RegisterForm;
