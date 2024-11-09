import { IRootState } from '@/store';
import React, { useEffect } from 'react';
import { LoaderIcon } from 'lucide-react';
import { useAppContext } from '@/contexts/app-context';
import { useDispatch, useSelector } from 'react-redux';
import { updateIsEdit } from '@/store/permission-slice';
import { Controller, FormProvider } from 'react-hook-form';
import { QueryKeyConstants } from '@/constants/query-keys';
import { permissionTypeOptions } from '@/constants/form-constants';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as PermissionServices from '@/services/permission-services';
import { usePermissionForm } from '../hook-form-definitions/use-permission-form';
import SelectDropdown from '@/components/molecules/select-dropdowns/select-placeholder';

type PermissionFormProps = {
    isSheetOpen: boolean; // Explicitly define this as a required boolean prop
    setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>; // State setter for boolean
    editData?: any;
};

const PermissionForm: React.FC<PermissionFormProps> = ({ isSheetOpen, setIsSheetOpen, editData }) => {
    const isEdit = useSelector((state: IRootState) => state.permissionReducer?.isEdit);
    const permissionForm = usePermissionForm();
    const dispatch = useDispatch();
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();

    const {
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset,
        setValue,
    } = permissionForm;

    const errorObject: object | any = errors;

    const getFormErrorMessage = (name: string) => {
        return errorObject[name] ? <small className="text-red-600">{errorObject[name].message}</small> : <small className="text-red-600">&nbsp;</small>;
    };

    useEffect(() => {
        if (!isSheetOpen) {
            clearErrors();
            reset(); // This will reset all form fields to their default values
            dispatch(updateIsEdit(false));
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
        }
    }, [editData, setValue]);

    const { refetch } = useQuery(QueryKeyConstants.GET_ALL_AUTHORIZED_PERMISSIONS_KEY, PermissionServices.fetchAuthorizedPermissions, {
        onError: () => {},
    });
    // create / save
    const { mutate: createMutate, isLoading: isCreateLoading } = useMutation(PermissionServices.createPermission, {
        onSuccess: async () => {
            showToast({ message: 'Permission saved successfully!', icon: 'success', position: 'top-end' });
            reset();
            await queryClient.invalidateQueries(QueryKeyConstants.GET_VALIDATE_TOKEN_KEY);
            refetch();
            setIsSheetOpen(false);
        },
        onError: (error: Error) => {
            showToast({ message: error.message, icon: 'error', position: 'top-end' });
        },
    });

    // update
    const { mutate: updateMutate, isLoading: isUpdateLoading } = useMutation(PermissionServices.updatePermissionById, {
        onSuccess: () => {
            showToast({ message: 'Permission updated successfully!', icon: 'success', position: 'top-end' });
            refetch();
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
                    <FormProvider {...permissionForm}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="pt-5">
                                <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Controller
                                        control={permissionForm.control}
                                        name={'code'}
                                        render={({ field }) => (
                                            <div>
                                                <label htmlFor="code" className="mb-2 block font-medium">
                                                    Code
                                                </label>
                                                <input
                                                    id={field.name}
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    placeholder="Enter code"
                                                    className="form-input w-full rounded-md border p-2"
                                                />
                                                {getFormErrorMessage('code')}
                                            </div>
                                        )}
                                    />
                                    <Controller
                                        control={permissionForm.control}
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
                                        control={permissionForm.control}
                                        name={'type'}
                                        render={({ field }) => (
                                            <div>
                                                <label htmlFor="type" className="mb-2 block font-medium">
                                                    Type
                                                </label>
                                                <SelectDropdown
                                                    id={field.name}
                                                    value={field.value} // Pass the current value from React Hook Form
                                                    onChange={(selectedOption: any) => field.onChange(selectedOption.value)} // Extract value from the selected option
                                                    placeholder="Choose..."
                                                    options={permissionTypeOptions} // Your PermissionTypes options should be in { label, value } format
                                                    isSearchable={false}
                                                />
                                                {getFormErrorMessage('type')}
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-1">
                                    <Controller
                                        control={permissionForm.control}
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

                                                {getFormErrorMessage('name')}
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className="mt-5 flex justify-end">
                                    <button type="submit" className="btn btn-primary w-[20%]" disabled={isCreateLoading || isUpdateLoading}>
                                        {isEdit ? 'Update' : isUpdateLoading ? <LoaderIcon className="animate-spin" /> : isCreateLoading ? <LoaderIcon className="animate-spin" /> : 'Create'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </>
    );
};

export default PermissionForm;
