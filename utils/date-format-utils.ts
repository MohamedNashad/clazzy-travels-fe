import moment from 'moment';

// Helper function to get the current date range using Moment.js
export const getCurrentDateRange = (): [string, string] => {
    const startOfToday = moment().startOf('day'); // Start of today
    const endOfToday = moment().endOf('day'); // End of today
    return [
        startOfToday.format('YYYY-MM-DD'), // Backend format (date only)
        endOfToday.format('YYYY-MM-DD'), // Backend format (date only)
    ];
};

export const formatDateRange = (range: string) => {
    const [startDate, endDate] = range.split(' to '); // Split by ' to '
    // Parse dates using Moment and format them
    const formattedStartDate = moment(startDate, 'YYYY-MM-DD').format('MM/DD/YYYY');
    const formattedEndDate = moment(endDate, 'YYYY-MM-DD').format('MM/DD/YYYY');
    return `${formattedStartDate} - ${formattedEndDate}`;
};

export function formatDate(date: string | Date | undefined): {
    formatted1: string; // "MMM DD, YYYY" e.g., "Aug 04, 2024"
    formatted2: string; // "MM/DD/YYYY" e.g., "08/04/2024"
    formatted3: string; // "YYYY-MM-DD" e.g., "2024-08-04"
    formatted4: string; // "YYYY-MM-DD" e.g., "2024-08-04"
    formatted5: string; // "YYYY-MM-DD" e.g., "2024-08-04"
    formatted6: string;
    formatted7: string;
    formatted8: string;
    formatted9: string;
} {
    const parsedDate = moment(date);
    const formatted1 = parsedDate.format('MMM DD, YYYY');
    const formatted2 = parsedDate.format('MM/DD/YYYY');
    const formatted3 = parsedDate.format('YYYY-MM-DD'); // New format added
    const formatted4 = parsedDate.format('MM/DD/YYYY hh:mm A'); // New format added
    const formatted5 = parsedDate.format('dd'); // New format added
    const formatted6 = parsedDate.format('hh:mm A');
    const formatted7 = parsedDate.format('MMMM Do, YYYY, dddd'); //October 14th, 2024, Monday
    const formatted8 = parsedDate.format('DD ddd, MMM YYYY | hh:mm A'); // 11 Mon, Aug 2024 | 12:00 AM
    const formatted9 = parsedDate.format('DD ddd, MMM YYYY'); //11 Mon, Aug 2024

    return {
        formatted1,
        formatted2,
        formatted3,
        formatted4,
        formatted5,
        formatted6,
        formatted7,
        formatted8,
        formatted9,
    };
}
