import { IRootState } from '@/store';
import { Tab } from '@headlessui/react';
import { LoaderIcon } from 'lucide-react';
import { PermissionType } from '@/types/forms';
import { updateIsEdit } from '@/store/role-slice';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { useAppContext } from '@/contexts/app-context';
import { useDispatch, useSelector } from 'react-redux';
import * as RoleServices from '@/services/role-services';
import { Controller, FormProvider } from 'react-hook-form';
import { QueryKeyConstants } from '@/constants/query-keys';
import React, { Fragment, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { capitalizeFirstLetter } from '@/utils/text-transform-utils';
import * as PermissionServices from '@/services/permission-services';
import * as RolePermissionServices from '@/services/role-permission-services';
import { useRoleForm } from '@/components/forms/hook-form-definitions/use-role-form';

type RoleFormProps = {
    isSheetOpen: boolean; // Explicitly define this as a required boolean prop
    setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>; // State setter for boolean
    editData?: any;
};

const RoleForm: React.FC<RoleFormProps> = ({ isSheetOpen, setIsSheetOpen, editData }) => {
    const isEdit = useSelector((state: IRootState) => state.roleReducer?.isEdit);
    const roleForm = useRoleForm();
    const dispatch = useDispatch();
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();

    const {
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset,
        setValue,
    } = roleForm;

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
            setSelectedIndex(0);
        }
    }, [isSheetOpen, clearErrors, reset]);

    useEffect(() => {
        // in this use effect by using the roleId fetch the assignedPermissions for them as well
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
            // Fetch permissions based on `editData._id`
            RolePermissionServices.fetchAuthorizedRoleWithPermissions(dataConvert._id)
                .then((response: any) => {
                    if (response?.permissions) {
                        // Extract only the permission IDs
                        const permissionIds = response.permissions.map((permission: any) => permission._id);
                        // Set permissions in form values
                        setValue('permissions', permissionIds);
                    }
                })
                .catch((error) => {
                    console.error('Failed to fetch role permissions:', error);
                });
        }
    }, [editData, setValue]);

    const { refetch: rolesRefetch } = useQuery(QueryKeyConstants.GET_ALL_AUTHORIZED_ROLES_KEY, RoleServices.fetchAuthorizedRoles, {
        onError: () => {},
    });

    const {
        isLoading: isPermissionLoading,
        data: permissionsData,
        refetch: permissionsRefetch,
    } = useQuery(QueryKeyConstants.GET_ALL_AUTHORIZED_PERMISSIONS_KEY, PermissionServices.fetchAuthorizedPermissions, {
        onError: () => {},
    });

    const { mutate: createMutate, isLoading: isCreateLoading } = useMutation(
        (values: any) => RoleServices.createRole(values), // Pass `values` to the API call
        {
            onSuccess: async (response: any, variables) => {
                if (response?.data) {
                    const assignPermissionsPayload: any = {
                        roleId: response.data._id,
                        permissions: variables.permissions, // Use permissions from `values`
                    };
                    await assignPermissionsMutate(assignPermissionsPayload);
                }
                // showToast({ message: 'Role saved successfully!', icon: 'success', position: 'top-end' });
                showToast({ message: 'Role and Permissions saved successfully!', icon: 'success', position: 'top-end' });
                reset();
                await queryClient.invalidateQueries(QueryKeyConstants.GET_VALIDATE_TOKEN_KEY);
                rolesRefetch();
                setIsSheetOpen(false);
            },
            onError: (error: Error) => {
                showToast({ message: error.message, icon: 'error', position: 'top-end' });
            },
        }
    );

    const { mutate: updateMutate, isLoading: isUpdateLoading } = useMutation(
        (values: any) => RoleServices.updateRoleById(values), // Pass `values` to the API call
        {
            onSuccess: async (response: any, variables) => {
                // `variables` contains the original `values`
                if (response?.data) {
                    const assignPermissionsPayload: any = {
                        roleId: response.data._id,
                        permissions: variables.permissions, // Use permissions from `values`
                    };
                    assignPermissionsMutate(assignPermissionsPayload);
                }
                showToast({ message: 'Role and Permissions updated successfully!', icon: 'success', position: 'top-end' });
                rolesRefetch();
                setIsSheetOpen(false);
            },
            onError: (error: Error) => {
                showToast({ message: error.message, icon: 'error', position: 'top-end' });
            },
        }
    );

    // assignPermissions
    const { mutate: assignPermissionsMutate, isLoading: isAssignPermissionsLoading } = useMutation(RolePermissionServices.assignAuthorizedPermissionsToRole, {
        onSuccess: async () => {
            reset();
            await queryClient.invalidateQueries(QueryKeyConstants.GET_VALIDATE_TOKEN_KEY);
            rolesRefetch();
            setIsSheetOpen(false);
        },
        onError: (error: Error) => {
            showToast({ message: error.message, icon: 'error', position: 'top-end' });
        },
    });

    const groupedPermissions: Record<string, PermissionType[]> = (permissionsData || []).reduce((acc, permission) => {
        if (!acc[permission.type]) acc[permission.type] = [];
        acc[permission.type].push(permission);
        return acc;
    }, {} as Record<string, PermissionType[]>);

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
                    <FormProvider {...roleForm}>
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
                                                Permissions
                                            </button>
                                        )}
                                    </Tab>
                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel>
                                        <div className="active pt-5">
                                            <div className="pt-5">
                                                <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                    <Controller
                                                        control={roleForm.control}
                                                        name={'slug'}
                                                        render={({ field }) => (
                                                            <div>
                                                                <label htmlFor="slug" className="mb-2 block font-medium">
                                                                    Slug
                                                                </label>
                                                                <input
                                                                    id={field.name}
                                                                    value={field.value}
                                                                    onChange={(e) => field.onChange(e.target.value)}
                                                                    placeholder="Enter slug"
                                                                    className="form-input w-full rounded-md border p-2"
                                                                />
                                                                {getFormErrorMessage('slug')}
                                                            </div>
                                                        )}
                                                    />
                                                    <Controller
                                                        control={roleForm.control}
                                                        name={'name'}
                                                        render={({ field }) => (
                                                            <div>
                                                                <label htmlFor="name" className="mb-2 block font-medium">
                                                                    Name
                                                                </label>
                                                                <input
                                                                    id={field.name}
                                                                    value={field.value}
                                                                    onChange={(e) => field.onChange(e.target.value)}
                                                                    placeholder="Enter name"
                                                                    className="form-input w-full rounded-md border p-2"
                                                                />
                                                                {getFormErrorMessage('name')}
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                                <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-1">
                                                    <Controller
                                                        control={roleForm.control}
                                                        name={'description'}
                                                        render={({ field }) => (
                                                            <div>
                                                                <label htmlFor="description" className="mb-2 block font-medium">
                                                                    Description
                                                                </label>
                                                                <textarea
                                                                    id="description"
                                                                    rows={3}
                                                                    value={field.value || ''}
                                                                    onChange={(e) => field.onChange(e.target.value)}
                                                                    className="form-textarea w-full rounded-md border p-2"
                                                                    placeholder="Enter description"
                                                                />

                                                                {getFormErrorMessage('description')}
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Panel>

                                    <Tab.Panel>
                                        <Controller
                                            control={roleForm.control}
                                            name="permissions"
                                            render={({ field }) => (
                                                <div className="space-y-6 pt-5">
                                                    <label htmlFor="permissionCategories" className="mb-2 block font-medium">
                                                        Permission Categories:
                                                    </label>
                                                    {Object.entries(groupedPermissions).map(([type, permissions]) => (
                                                        <div key={type}>
                                                            {/* Permission Type Label */}
                                                            <label htmlFor="type" className="mb-2 block font-medium">
                                                                {capitalizeFirstLetter(type)}
                                                            </label>
                                                            {/* Permission Cards Grid - 3 items per row */}
                                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                                                {permissions.map((permission) => {
                                                                    const isSelected = field.value?.includes(permission._id);

                                                                    return (
                                                                        <div
                                                                            key={permission._id}
                                                                            className={`relative flex h-16 cursor-pointer items-center rounded-lg border p-4 ${
                                                                                isSelected
                                                                                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-blue-100'
                                                                                    : 'bg-white text-black dark:bg-gray-700 dark:text-white'
                                                                            }`}
                                                                            onClick={() => {
                                                                                // Toggle selection
                                                                                const newPermissions = isSelected
                                                                                    ? field.value?.filter((_id: string) => _id !== permission._id)
                                                                                    : [...(field.value || []), permission._id];
                                                                                field.onChange(newPermissions);
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
                                                                                <p className="text-lg">{permission.name}</p>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    ))}
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

export default RoleForm;
