import { IRootState } from '@/store';
import { Tab } from '@headlessui/react';
import { LoaderIcon } from 'lucide-react';
import { updateIsEdit } from '@/store/user-slice';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { useAppContext } from '@/contexts/app-context';
import { useDispatch, useSelector } from 'react-redux';
import * as RoleServices from '@/services/role-services';
import * as UserServices from '@/services/user-services';
import { QueryKeyConstants } from '@/constants/query-keys';
import { Controller, FormProvider } from 'react-hook-form';
import React, { Fragment, useEffect, useState } from 'react';
import * as UserRoleServices from '@/services/user-role-services';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useUserForm } from '@/components/forms/hook-form-definitions/use-user-form';

type UserFormProps = {
    isSheetOpen: boolean; // Explicitly define this as a required boolean prop
    setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>; // State setter for boolean
    editData?: any;
};

const UserForm: React.FC<UserFormProps> = ({ isSheetOpen, setIsSheetOpen, editData }) => {
    const isEdit = useSelector((state: IRootState) => state.userReducer?.isEdit);
    const userForm = useUserForm();
    const dispatch = useDispatch();
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();

    const {
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset,
        setValue,
    } = userForm;

    const errorObject: object | any = errors;

    const getFormErrorMessage = (name: string) => {
        return errorObject[name] ? <small className="text-red-600">{errorObject[name].message}</small> : <small className="text-red-600">&nbsp;</small>;
    };

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (!isSheetOpen) {
            clearErrors();
            reset(); // This will reset all form fields to their default values
            dispatch(updateIsEdit(false));
            // Set "Details" as the default tab
            setSelectedIndex(0);
        }
    }, [isSheetOpen, clearErrors, reset]);

    useEffect(() => {
        if (editData) {
            dispatch(updateIsEdit(true));
            let dataConvert;
            try {
                dataConvert = JSON.parse(editData);
            } catch (error) {
                console.error('Failed to parse editData:', error);
                return;
            }
            // Set data to edit fields
            Object.keys(dataConvert).forEach((key: any) => {
                setValue(key, dataConvert[key]);
            });

            // Fetch roles based on `editData._id`
            UserRoleServices.fetchAuthorizedUserWithRoles(dataConvert._id)
                .then((response: any) => {
                    if (response?.roles) {
                        // Extract only the permission IDs
                        const roleIds = response.roles.map((role: any) => role._id);
                        // Set roles in form values
                        setValue('roles', roleIds);
                    }
                })
                .catch((error) => {
                    console.error('Failed to fetch role permissions:', error);
                });
        }
    }, [editData, setValue]);

    const { refetch: usersRefetch } = useQuery(QueryKeyConstants.GET_ALL_AUTHORIZED_USERS_KEY, UserServices.fetchAuthorizedUsers, {
        onError: () => {},
    });

    const {
        isLoading: isRolesLoading,
        data: rolesData,
        refetch: rolesRefetch,
    } = useQuery(QueryKeyConstants.GET_ALL_AUTHORIZED_ROLES_KEY, RoleServices.fetchAuthorizedRoles, {
        onError: () => {},
    });

    const { mutate: createMutate, isLoading: isCreateLoading } = useMutation(
        (values: any) => UserServices.createUser(values), // Pass `values` to the API call
        {
            onSuccess: async (response: any, variables) => {
                if (response?.user) {
                    const assignRolesPayload: any = {
                        userId: response.user._id,
                        roles: variables.roles, // Use permissions from `values`
                    };
                    await assignRolesMutate(assignRolesPayload);
                }
                showToast({ message: 'User and Roles saved successfully!', icon: 'success', position: 'top-end' });
                reset();
                await queryClient.invalidateQueries(QueryKeyConstants.GET_VALIDATE_TOKEN_KEY);
                usersRefetch();
                setIsSheetOpen(false);
            },
            onError: (error: Error) => {
                showToast({ message: error.message, icon: 'error', position: 'top-end' });
            },
        }
    );

    const { mutate: updateMutate, isLoading: isUpdateLoading } = useMutation(
        (values: any) => UserServices.updateUserById(values), // Pass `values` to the API call
        {
            onSuccess: async (response: any, variables) => {
                if (response?.data) {
                    const assignRolesPayload: any = {
                        userId: response.data._id,
                        roles: variables.roles, // Use permissions from `values`
                    };
                    await assignRolesMutate(assignRolesPayload);
                }
                showToast({ message: 'User and Roles updated successfully!', icon: 'success', position: 'top-end' });
                usersRefetch();
                setIsSheetOpen(false);
            },
            onError: (error: Error) => {
                showToast({ message: error.message, icon: 'error', position: 'top-end' });
            },
        }
    );

    // assignPermissions
    const { mutate: assignRolesMutate, isLoading: isAssignRolesLoading } = useMutation(UserRoleServices.assignAuthorizedRolesToUser, {
        onSuccess: async () => {
            reset();
            await queryClient.invalidateQueries(QueryKeyConstants.GET_VALIDATE_TOKEN_KEY);
            usersRefetch();
            setIsSheetOpen(false);
        },
        onError: (error: Error) => {
            showToast({ message: error.message, icon: 'error', position: 'top-end' });
        },
    });

    const onSubmit = async (values: any) => {
        if (isEdit) {
            updateMutate(values);
        } else {
            createMutate(values);
        }
    };

    return (
        <>
            <div className="flex w-full flex-col justify-center border-none shadow-none">
                <div className="container">
                    {' '}
                    <FormProvider {...userForm}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                                <Tab.List className="mt-3 flex flex-wrap">
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${
                                                    selected ? 'text-secondary !outline-none before:!w-full' : ''
                                                } relative -mb-[1px] flex items-center gap-x-2 p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                            >
                                                Details
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${
                                                    selected ? 'text-secondary !outline-none before:!w-full' : ''
                                                } relative -mb-[1px] flex items-center gap-x-2 p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                            >
                                                Roles
                                            </button>
                                        )}
                                    </Tab>
                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel>
                                        <div className="active pt-5">
                                            <div className="pt-5">
                                                <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                                    <Controller
                                                        control={userForm.control}
                                                        name={'email'}
                                                        render={({ field }) => (
                                                            <div>
                                                                <label htmlFor="email" className="mb-2 block font-medium">
                                                                    E-mail
                                                                </label>
                                                                <input
                                                                    id={field.name}
                                                                    value={field.value}
                                                                    onChange={(e) => field.onChange(e.target.value)}
                                                                    placeholder="Enter email"
                                                                    className="form-input w-full rounded-md border p-2"
                                                                />
                                                                {getFormErrorMessage('email')}
                                                            </div>
                                                        )}
                                                    />
                                                    <Controller
                                                        control={userForm.control}
                                                        name={'firstName'}
                                                        render={({ field }) => (
                                                            <div>
                                                                <label htmlFor="firstName" className="mb-2 block font-medium">
                                                                    First Name
                                                                </label>
                                                                <input
                                                                    id={field.name}
                                                                    value={field.value}
                                                                    onChange={(e) => field.onChange(e.target.value)}
                                                                    placeholder="Enter first name"
                                                                    className="form-input w-full rounded-md border p-2"
                                                                />
                                                                {getFormErrorMessage('firstName')}
                                                            </div>
                                                        )}
                                                    />
                                                    <Controller
                                                        control={userForm.control}
                                                        name={'lastName'}
                                                        render={({ field }) => (
                                                            <div>
                                                                <label htmlFor="lastName" className="mb-2 block font-medium">
                                                                    Last Name
                                                                </label>
                                                                <input
                                                                    id={field.name}
                                                                    value={field.value}
                                                                    onChange={(e) => field.onChange(e.target.value)}
                                                                    placeholder="Enter last name"
                                                                    className="form-input w-full rounded-md border p-2"
                                                                />
                                                                {getFormErrorMessage('lastName')}
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Panel>

                                    <Tab.Panel>
                                        <Controller
                                            control={userForm.control}
                                            name="roles"
                                            render={({ field }) => (
                                                <div className="space-y-6 pt-5">
                                                    {/* Permission Cards Grid - 3 items per row */}
                                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                                        {rolesData?.map((role) => {
                                                            const isSelected = field.value?.includes(role._id);

                                                            return (
                                                                <div
                                                                    key={role._id}
                                                                    className={`relative flex h-16 cursor-pointer items-center rounded-lg border p-4 ${
                                                                        isSelected
                                                                            ? 'bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-blue-100'
                                                                            : 'bg-white text-black dark:bg-gray-700 dark:text-white'
                                                                    }`}
                                                                    onClick={() => {
                                                                        // Toggle selection
                                                                        const newRole = isSelected ? field.value?.filter((_id: string) => _id !== role._id) : [...(field.value || []), role._id];
                                                                        field.onChange(newRole);
                                                                    }}
                                                                >
                                                                    {/* Custom Checkbox Indicator with Fixed Width */}
                                                                    <div className="mr-3 h-8 w-8 flex-shrink-0">
                                                                        <div
                                                                            className={`flex h-full w-full items-center justify-center rounded-full border-2 ${
                                                                                isSelected ? 'border-blue-700 bg-blue-700' : 'border-gray-400'
                                                                            }`}
                                                                        >
                                                                            {isSelected && <IoCheckmarkSharp className="text-white" />}
                                                                        </div>
                                                                    </div>

                                                                    {/* Permission Label */}
                                                                    <div className="flex-1">
                                                                        <p className="text-lg">{role.name}</p>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                            <div className="mt-5 flex justify-end">
                                <button type="submit" className="btn btn-primary w-[20%]" disabled={isCreateLoading || isUpdateLoading}>
                                    {isEdit ? 'Update' : isUpdateLoading ? <LoaderIcon className="animate-spin" /> : isCreateLoading ? <LoaderIcon className="animate-spin" /> : 'Create'}
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </>
    );
};

export default UserForm;
