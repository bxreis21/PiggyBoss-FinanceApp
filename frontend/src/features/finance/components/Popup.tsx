import React from 'react';
import PiggyBox from '../../../shared/components/PiggyBox.js';

interface PopupProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Popup({ title, isOpen, onClose, children }: PopupProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {children}
        </div>
    );
}
