import React from 'react';

interface PiggyBoxProps {
    children: React.ReactNode;
    variant: 'primary' | 'secondary' | 'tertiary';
    border?: boolean;
}

const variantClasses = {
    primary: 'bg-[var(--strong-tech)]',
    secondary: 'bg-[var(--tech)]',
    tertiary: 'bg-[var(--week-tech)]',
};

export default function PiggyBox({ children, variant, border = false }: PiggyBoxProps) {
    return (
        <div className={`flex flex-col items-center w-full h-full rounded-2xl overflow-hidden ${variantClasses[variant]} ${border ? 'border border-[var(--purple-purple)]' : ''}`}>
            {children}
        </div>
    );
}
