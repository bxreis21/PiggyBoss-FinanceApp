import PiggyBox from "../../../../shared/components/PiggyBox/PiggyBox.js";

interface MoneyCardProps {
    title: string;
    number: number;
}

export default function MoneyCard({ title, number }: MoneyCardProps) {
    return (
        <PiggyBox variant='secondary'>
            <div className="h-full w-full p-4 flex flex-col items-start justify-center gap-2">
                <h2>{title}</h2>
                <h1 className="text-4xl">$ {number.toFixed(2)}</h1>
            </div>
        </PiggyBox>
    )
}