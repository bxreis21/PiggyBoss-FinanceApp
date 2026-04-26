import React from "react";
import styles from './PiggyBox.module.css';

interface PiggyBoxProps {
    children: React.ReactNode;
    variant: 'primary' | 'secondary';
    border?: boolean;
}

export default function PiggyBox({ children, variant, border=false }: PiggyBoxProps){
    return (
        <div className={[
        styles.box,
        styles[variant],
        border ? styles.border : ''
    ].join(" ")}>
            {children}
        </div>
    );
}