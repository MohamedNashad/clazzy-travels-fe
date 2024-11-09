import * as yup from 'yup';

export const enquirySchema = yup.object({
    _id: yup.string().nullable(),
    phoneNo: yup.string().required('Phone Number is required!').matches(/^\d+$/, 'Phone Number must contain only numbers').length(10, 'Phone Number must be exactly 10 digits'),
    name: yup.string().required('Name is required!'),
    tripType: yup.string().required('Trip Type is required!'),
    leavingFrom: yup.string().required('Leaving From is required!'),
    leavingTo: yup.string().required('Leaving To is required!'),
    dateRange: yup.string().required('Date Range is required!'),
    cabinClassAndTravellers: yup.string().required('Cabin Class & Travels is required!'),
    status: yup.string().nullable(),
    isDelete: yup.boolean().nullable(),
    isStudentFare: yup.boolean().nullable(),
});
