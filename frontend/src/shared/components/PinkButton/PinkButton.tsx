import React from 'react';
import styles from './PinkButton.module.css';

interface PinkButtonProps {
    className?: string,
    text: string;
}

export default function PinkButton({ text, className }: PinkButtonProps) {

    return <button type="submit" className={[styles['pink-button'], className].join(' ')}>
        {text}
    </button>
}
