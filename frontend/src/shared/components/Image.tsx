interface ImageProps {
    src: string;
    size: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}

const sizeClasses = {
    sm: 'h-[50px] px-[12px] py-[6px]',
    md: 'h-[90px] px-[12px] py-[6px]',
    lg: 'h-[130px] px-[12px] py-[6px]',
};

export default function Image({ src, size, disabled }: ImageProps) {
    return (
        <div className={`max-h-full object-contain ${sizeClasses[size || 'sm']} ${disabled ? 'opacity-50' : ''}`}>
            <img src={src} alt="Logo" className="max-h-full object-contain" />
        </div>
    );
}
