// useEnquiryForm.tsx
'use client';
import { useForm } from 'react-hook-form';
import { enquirySchema } from '@/validations/enquiry';
import { yupResolver } from '@hookform/resolvers/yup';

export const useEnquiryForm = () => {
    return useForm({
        mode: 'onSubmit',
        resolver: yupResolver(enquirySchema),
        defaultValues: {
            _id: '',
            phoneNo: '',
            name: '',
            tripType: '',
            leavingFrom: '',
            leavingTo: '',
            dateRange: '',
            cabinClassAndTravellers: '',
            status: '',
            isStudentFare: false,
        },
    });
};
