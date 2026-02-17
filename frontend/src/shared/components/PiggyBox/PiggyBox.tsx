import React from "react";
import styles from './PiggyBox.module.css';
import { dark_theme, light_theme}  from '../../styles/theme.js';

interface PiggyBoxProps {
    children: React.ReactNode;
    variant: 'primary' | 'secondary';
    size: 'sm' | 'md' | 'lg';   
}

export default function PiggyBox({ children, variant, size }: PiggyBoxProps){
    return (
        <div className={[
        styles.box,
        styles[variant],
        styles[size],
    ].join(" ")}>
            {children}
        </div>
    );
}
