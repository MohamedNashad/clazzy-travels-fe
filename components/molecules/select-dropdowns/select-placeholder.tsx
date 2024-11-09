'use client';
import React from 'react';
import Select from 'react-select';

const SelectDropdown = ({ options, value, onChange }: any) => {
    return (
        <Select
            placeholder="Choose..."
            options={options}
            value={options.find((option: any) => option.value === value)} // Match the current value
            onChange={onChange} // Pass the selected option to onChange
            isSearchable={false}
        />
    );
};

export default SelectDropdown;
