'use client';

import { IRootState } from '@/store';
import 'flatpickr/dist/flatpickr.css';
import Flatpickr from 'react-flatpickr';
import { useSelector } from 'react-redux';
import { useAppContext } from '@/contexts/app-context';
import { radioOptions } from '@/constants/form-constants';
import { useMutation, useQueryClient } from 'react-query';
import { Controller, FormProvider } from 'react-hook-form';
import { formatDateRange } from '@/utils/date-format-utils';
import * as EnquiryServices from '@/services/enquiry-services';
import { useEnquiryForm } from '@/components/forms/hook-form-definitions/use-enquiry-form';
import { CommonRadioButtonCard } from '@/components/organisms/common-radio-button-card/common-radio-button-card';

const HomePageEnquiryForm = () => {
    const isRtl = useSelector((state: IRootState) => state.themeConfigReducer.rtlClass) === 'rtl' ? true : false;
    const enquiryForm = useEnquiryForm();
    const { showToast } = useAppContext();

    const {
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset,
        setValue,
    } = enquiryForm;

    const errorObject: object | any = errors;

    const getFormErrorMessage = (name: string) => {
        return errorObject[name] ? <small className="text-red-600">{errorObject[name].message}</small> : <small className="text-red-600">&nbsp;</small>;
    };

    const { mutate: createMutate, isLoading: isCreateLoading } = useMutation(EnquiryServices.createEnquiry, {
        onSuccess: async () => {
            showToast({ message: 'Enquiry sent successfully!', icon: 'success', position: 'top-end' });
            reset();
        },
        onError: (error: Error) => {
            showToast({ message: error.message, icon: 'error', position: 'top-end' });
        },
    });

    const onSubmit = async (values: any) => {
        const { dateRange } = values; // Ensure these properties exist in `data`
        const modifiedPayload = {
            dateRange: formatDateRange(dateRange),
            ...values,
        };
        createMutate(modifiedPayload);
    };

    return (
        <FormProvider {...enquiryForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-0 py-5">
                <div className="grid gap-2">
                    <Controller
                        control={enquiryForm?.control}
                        name="tripType"
                        render={({ field }) => (
                            <div>
                                <label htmlFor="tripType">Trip Type</label>
                                <div className="flex w-full gap-4">
                                    {radioOptions?.map((option) => (
                                        <CommonRadioButtonCard
                                            key={option.value}
                                            label={option.label}
                                            name={option.name}
                                            value={option.value}
                                            selectedValue={field.value}
                                            onChange={field.onChange}
                                            className="w-full flex-grow" // Full width for each RadioCard
                                        />
                                    ))}
                                </div>
                                <div className="mt-1">{getFormErrorMessage('tripType')}</div>
                            </div>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
                    <Controller
                        control={enquiryForm.control}
                        name="phoneNo"
                        render={({ field }) => (
                            <div>
                                <label htmlFor="phoneNo">Phone</label>
                                <input
                                    type="text" // Change to 'text' for better length control
                                    id={field.name}
                                    value={field.value}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, ''); // Remove any non-numeric characters
                                        if (value.length <= 10) {
                                            field.onChange(value); // Only update if length is 10 or less
                                        }
                                    }}
                                    placeholder="Enter Phone Number"
                                    maxLength={10} // Limit input length to 10 characters
                                    className="form-input"
                                />
                                <div className="mt-1">{getFormErrorMessage('phoneNo')}</div>
                            </div>
                        )}
                    />

                    <Controller
                        control={enquiryForm.control}
                        name={'name'}
                        render={({ field }) => (
                            <div>
                                <label htmlFor="name">Name</label>
                                <input id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} placeholder="Enter Name" className="form-input" />
                                <div className="mt-1">{getFormErrorMessage('name')}</div>
                            </div>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
                    <Controller
                        control={enquiryForm.control}
                        name={'leavingFrom'}
                        render={({ field }) => (
                            <div>
                                <label htmlFor="leavingFrom">Leaving From</label>
                                <input id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} placeholder="Enter Start Destination" className="form-input" />
                                <div className="mt-1">{getFormErrorMessage('leavingFrom')}</div>
                            </div>
                        )}
                    />
                    <Controller
                        control={enquiryForm.control}
                        name={'leavingTo'}
                        render={({ field }) => (
                            <div>
                                <label htmlFor="leavingTo">Leaving To</label>
                                <input id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} placeholder="Enter End Destination" className="form-input" />
                                <div className="mt-1">{getFormErrorMessage('leavingTo')}</div>
                            </div>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
                    <Controller
                        control={enquiryForm.control}
                        name="dateRange"
                        render={({ field }) => (
                            <div>
                                <label htmlFor="dateRange">Departure - Return</label>
                                <Flatpickr
                                    options={{
                                        mode: 'range',
                                        dateFormat: 'Y-m-d',
                                        position: isRtl ? 'auto right' : 'auto left',
                                    }}
                                    value={field.value}
                                    className="form-input"
                                    onChange={(dates) => field.onChange(dates.length === 2 ? `${dates[0].toISOString()} to ${dates[1].toISOString()}` : '')}
                                />
                                <div className="mt-1 text-red-500">{getFormErrorMessage('dateRange')}</div>
                            </div>
                        )}
                    />

                    <Controller
                        control={enquiryForm.control}
                        name={'cabinClassAndTravellers'}
                        render={({ field }) => (
                            <div>
                                <label htmlFor="cabinClassAndTravellers">Cabin Class & Travellers</label>
                                <input id={field.name} value={field.value} onChange={(e) => field.onChange(e.target.value)} placeholder="Enter End Destination" className="form-input" />
                                <div className="mt-1">{getFormErrorMessage('cabinClassAndTravellers')}</div>
                            </div>
                        )}
                    />
                </div>

                <div>
                    <Controller
                        control={enquiryForm.control}
                        name="isStudentFare"
                        render={({ field }) => (
                            <div>
                                <input
                                    type="checkbox"
                                    id={field.name}
                                    checked={field.value || false} // Use `checked` instead of `value`
                                    onChange={(e) => field.onChange(e.target.checked)} // Pass `checked` value
                                    className="form-checkbox"
                                />
                                <span>Student Fare</span>
                                <div className="mt-1">{getFormErrorMessage('isStudentFare')}</div>
                            </div>
                        )}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full" disabled={isCreateLoading}>
                    Send
                </button>
            </form>
        </FormProvider>
    );
};

export default HomePageEnquiryForm;
