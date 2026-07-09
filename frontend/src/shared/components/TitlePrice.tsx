export default function TitlePrice({ title, price, priceColor }: { title: string; price: number; priceColor?: string }) {
    return (
        <div className="w-full flex items-center justify-between">
            <h4 className="m-0">{title}</h4>
            <h4 className={`m-0 ${priceColor || 'text-green-500'}`}>$ {price.toFixed(2)}</h4>
        </div>
    );
}
