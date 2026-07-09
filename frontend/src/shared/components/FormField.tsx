import React from 'react';

interface FormFieldProps {
    name: string;
    label: string;
    type: string;
    value: any;
    onChange: any;
    placeholder: string;
    required?: boolean;
    children?: React.ReactNode;
}

export default function FormField({ name, label, type, value, onChange, placeholder, required = false, children }: FormFieldProps) {
    return (
        <div className="w-[75%] text-left">
            <label htmlFor={label} className="block m-[0.1rem] text-[#ccc] text-[0.9rem]">
                {label}
            </label>
            {children ? (
                children
            ) : (
                <input
                    type={type}
                    id={label}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className="w-full p-[0.7rem] rounded-lg border-none bg-[#444] text-white text-base placeholder:text-[#aaa]"
                />
            )}
        </div>
    );
}
