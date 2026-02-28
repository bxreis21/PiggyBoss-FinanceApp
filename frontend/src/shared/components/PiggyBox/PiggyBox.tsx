import React from "react";
import styles from './PiggyBox.module.css';

interface PiggyBoxProps {
    children: React.ReactNode;
    variant: 'primary' | 'secondary';
}

export default function PiggyBox({ children, variant }: PiggyBoxProps){
    return (
        <div className={[
        styles.box,
        styles[variant]
    ].join(" ")}>
            {children}
        </div>
    );
}
