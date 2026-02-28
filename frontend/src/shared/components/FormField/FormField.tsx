import React from 'react';
import styles from './FormField.module.css';

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


export default function FormField({ name, label, type, value, onChange, placeholder, required = false, children }: FormFieldProps){

    return <div className={styles['form-field']}>
        <label htmlFor={label}>{label}</label>
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
                required = {required}
            />
        )}  
    </div>
}
