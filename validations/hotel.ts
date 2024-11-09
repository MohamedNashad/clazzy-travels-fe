import * as yup from 'yup';

export const addHotelSchema = yup.object({
    name: yup.string().required('Name is required!'),
    city: yup.string().required('City is required!'),
    country: yup.string().required('Country is required!'),
    description: yup.string().required('Description is required!'),
    type: yup.string().required('Name is required!'),
    pricePerNight: yup.number().required('Price per night is required!'),
    starRating: yup.number().required('Star rating is required!'),
    facilities: yup.array().of(yup.string().required()).required('Facilities are required!'),
    imageFiles: yup
        .mixed()
        .optional()
        .test('is-file-list', 'Invalid file type', (value: any) => {
            return value === null || value instanceof FileList;
        }),
    adultCount: yup.number().required('Adult count is required!'),
    childCount: yup.number().required('Child count is required!'),
});
