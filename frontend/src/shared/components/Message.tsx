interface MessageProps {
    message: string;
    type: 'success' | 'error';
}

export default function Message({ message, type }: MessageProps) {
    const tone = type === 'error' ? 'text-[var(--bad-red)]' : 'text-[var(--good-green)]';

    return (
        <div className={`w-full rounded-lg text-center text-base p-2 ${tone}`}>
            <p>{message}</p>
        </div>
    );
}
