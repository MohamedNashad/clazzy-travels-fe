interface CommonRadioButtonCardProps {
    label: string;
    name: string;
    value: string;
    selectedValue: string;
    onChange: (value: string) => void;
    className?: string; // Add className as an optional prop
}

export const CommonRadioButtonCard: React.FC<CommonRadioButtonCardProps> = ({ label, name, value, selectedValue, onChange, className }) => {
    const isSelected = selectedValue === value;

    return (
        <label
            className={`flex w-full cursor-pointer items-center space-x-2 rounded-lg border p-4 transition-colors ${
                isSelected ? 'border-blue-300 bg-blue-300 text-white' : 'border-gray-300 bg-white text-gray-900'
            } hover:bg-blue-500`}
        >
            <input type="radio" name={name} value={value} checked={isSelected} onChange={() => onChange(value)} className="form-radio text-blue-600" />
            <span>{label}</span>
        </label>
    );
};
