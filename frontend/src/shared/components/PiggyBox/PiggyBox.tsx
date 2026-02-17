import React from "react";
import styles from './PiggyBox.module.css';

interface PiggyBoxProps {
    children: React.ReactNode;
    variant: 'primary' | 'secondary';
    size: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    horizontal?: boolean;
}

export default function PiggyBox({ children, variant, size, horizontal}: PiggyBoxProps){
    return (
        <div className={[
        styles.box,
        styles[variant],
        styles[size],
        styles[horizontal ? 'horizontal' : 'vertical']
    ].join(" ")}>
            {children}
        </div>
    );
}
