import style from './BankCard.module.css'

interface BankCardProps {
    bank_name: string;
    balance: number;
    credit_bill: number;
    selected?: boolean;
}

export default function BankCard({ bank_name, balance, credit_bill, selected }: BankCardProps) {
    return (
        <div className={[
            style.card,
            selected ? style.selected : ''
        ].join(" ")}>
            
            <div className={style.card__header}>
                <h4>{bank_name}</h4>
            </div>

            <div className={style.card__content}>

                <div className={style.card__labels}>
                    <p>Balance:</p>
                    <p>Credit Bill:</p>
                </div>
                

                <div className={style.card__values}>
                    <p>$ {balance} </p>
                    <p>$ {credit_bill} </p>
                </div>

            </div>
            
        </div>
    )
}
