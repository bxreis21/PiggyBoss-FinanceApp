import React from 'react';
import styles from './PinkButton.module.css';

interface PinkButtonProps {
    text: string;
}

export default function PinkButton({ text }: PinkButtonProps) {

    return <button type="submit" className={styles['pink-button']}>
        {text}
    </button>
}
