'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';
import { LoginFormData } from '@/types/forms';
import IconMail from '@/components/icon/icon-mail';
import { FrontEndRoutes } from '@/constants/routes';
import { userLoginSchema } from '@/validations/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useAppContext } from '@/contexts/app-context';
import * as AuthServices from '@/services/auth-services';
import { useMutation, useQueryClient } from 'react-query';
import { QueryKeyConstants } from '@/constants/query-keys';
import IconLockDots from '@/components/icon/icon-lock-dots';

const LoginForm = () => {
    const router = useRouter();
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const validationSchema = userLoginSchema;

    const [loading, setLoading] = useState(false);

    const { control, formState, handleSubmit, reset, setValue, resetField } = useForm<LoginFormData>({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const errors: object | any = formState.errors;

    const getFormErrorMessage = (name: string) => {
        return errors[name] ? <small className="p-1 text-sm text-red-600">{errors[name].message}</small> : <small className="p-1 text-sm text-red-600">&nbsp;</small>;
    };

    const mutation = useMutation(AuthServices.signIn, {
        onSuccess: async () => {
            setLoading(false);
            showToast({ message: 'Sign in Successfull!', icon: 'success', position: 'top-end' });
            await queryClient.invalidateQueries(QueryKeyConstants.GET_VALIDATE_TOKEN_KEY);
            router.push(FrontEndRoutes.HOME_URL); // Redirect after token validation
        },
        onError: (error: Error) => {
            showToast({ message: error.message, icon: 'error', position: 'top-end' });
            setLoading(false);
        },
    });

    const onSubmit = handleSubmit((data: LoginFormData) => {
        setLoading(true);
        mutation.mutate(data);
    });

    return (
        <form className="space-y-5 dark:text-white" onSubmit={onSubmit}>
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

            <button type="submit" disabled={loading} className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                {loading ? <LoaderCircle className="animate-spin" /> : 'Sign in'}
            </button>
        </form>
    );
};

export default LoginForm;
