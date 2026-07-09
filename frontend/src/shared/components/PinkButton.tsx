import React from 'react';

interface PinkButtonProps {
    className?: string;
    text: string;
}

export default function PinkButton({ text, className }: PinkButtonProps) {
    return (
        <button
            type="submit"
            className={`bg-[var(--strong-pink)] text-[var(--font)] font-medium text-lg leading-tight cursor-pointer transition-colors duration-300 m-4 p-3 rounded-lg hover:bg-[var(--purple-purple)] ${className ?? ''}`}
        >
            {text}
        </button>
    );
}
