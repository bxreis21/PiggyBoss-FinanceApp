import styles from './PiggyTable.module.css'
import type { TransactionSchema } from '../../schemas.js'

interface PiggyColumn {
    name: string
    length: string
}

interface PiggyTableProps {
    header: Array<PiggyColumn>
    content: Array<TransactionSchema>
}

export default function PiggyTable({ header, content }: PiggyTableProps) {
    const renderRow = (transaction: TransactionSchema) => [
        transaction.date ?? '-',
        transaction.name,
        transaction.category ? transaction.category : '—',
        transaction.description ?? '-',
        transaction.third_party ? transaction.third_party : 'No',
        `$ ${Number(transaction.amount).toLocaleString('pt-BR')}`
    ]

    return (
        <div className={styles.piggy__table}>
            <div className={styles.line} style={{ gridTemplateColumns: header.map(column => `${column.length}fr`).join(' ') }}>
                {header.map((column, index) => (
                    <p key={index}> {column.name} </p>
                ))}
            </div>

            {content.map((transaction, lineIndex) => {
                const row = renderRow(transaction)

                return (
                    <div key={transaction.id ?? lineIndex} className={styles.line} style={{ gridTemplateColumns: header.map(column => `${column.length}fr`).join(' ') }}>
                        {row.map((label, labelIndex) => (
                            <p key={labelIndex}> {label}</p>
                        ))}
                    </div>
                )
            })}
        </div>
    )
}
