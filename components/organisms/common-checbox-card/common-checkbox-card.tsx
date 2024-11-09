// CommonCheckboxCard.tsx
import React from 'react';

interface CommonCheckboxCardProps {
    label: string;
    checked: boolean;
    onChange: () => void; // Function to handle checkbox state changes
    color: string; // Optional prop for dynamic background color
    id: string; // Unique ID for accessibility
}

const CommonCheckboxCard: React.FC<CommonCheckboxCardProps> = ({ label, checked, onChange, color, id }) => {
    return (
        <div
            className={`flex items-center cursor-pointer p-4 rounded-lg transition duration-200 ${checked ? color : 'bg-white'}`}
            onClick={onChange} // Make entire card clickable
        >
            <input
                type="checkbox"
                id={id} // Add ID for the input
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={checked} // Controlled input
                onChange={onChange} // Handle state change
            />
            <label htmlFor={id} className="ml-2 text-lg">{label}</label>
        </div>
    );
};

export default CommonCheckboxCard;
