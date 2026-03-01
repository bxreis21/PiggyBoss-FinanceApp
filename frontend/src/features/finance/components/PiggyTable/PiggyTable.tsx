import styles from './PiggyTable.module.css'

interface PiggyColumn {
    name: string
    length: string
}

interface PiggyTableProps {
    header?: Array<PiggyColumn>
    content?: Array<Array<string>>
}

const TEMP_MOCK_HEADER: Array<PiggyColumn> = [
    { name: "Date", length: "3" },
    { name: "Account", length: "5" },
    { name: "Transaction", length: "5" },
    { name: "Category", length: "5" },
    { name: "Description", length: "6" },
    { name: "Third-party", length: "3" },
    { name: "Value", length: "4" },
    { name: "", length: "1" },
    { name: "", length: "1" }
]

const TEMP_MOCK_CONTENT: Array<Array<string>> = [
    ["23/03/2001", "BTG Pactual", "Uber Trip* Trip", "Transporte", "uber para tal tal tal", "No", "$ 10.000", "E", "X"  ],
    ["23/03/2001", "BTG Pactual", "Uber Trip* Trip", "Transporte", "uber para tal tal tal", "No", "$ 10.000", "E", "X"  ],
    ["23/03/2001", "BTG Pactual", "Uber Trip* Trip", "Transporte", "uber para tal tal tal", "No", "$ 10.000", "E", "X"  ],
    ["23/03/2001", "BTG Pactual", "Uber Trip* Trip", "Transporte", "uber para tal tal tal", "No", "$ 10.000", "E", "X"  ],
    ["23/03/2001", "BTG Pactual", "Uber Trip* Trip", "Transporte", "uber para tal tal tal", "No", "$ 10.000", "E", "X"  ],
    ["23/03/2001", "BTG Pactual", "Uber Trip* Trip", "Transporte", "uber para tal tal tal", "No", "$ 10.000", "E", "X"  ],
    ["23/03/2001", "BTG Pactual", "Uber Trip* Trip", "Transporte", "uber para tal tal tal", "No", "$ 10.000", "E", "X"  ],
]

export default function PiggyTable({ header = TEMP_MOCK_HEADER, content = TEMP_MOCK_CONTENT }: PiggyTableProps) {

    const HEADER_TOTAL_LENGTH = header.reduce((acc, column) => acc + parseInt(column.length), 0)

    return (
        <div className={styles.piggy__table}>
            <div className={styles.line} style={{  gridTemplateColumns: header.map(column => `${column.length}fr`).join(" ")}}>
                {header.map((column, index) => (
                    <p key={index}> {column.name} </p>
                ))}
            </div>

            {content.map((line, lineIndex) => (
                <div key={lineIndex} className={styles.line} style={{ gridTemplateColumns: header.map(column => `${column.length}fr`).join(" ")}}>
                    {line.map((label, labelIndex) => (
                        <p key={labelIndex}> {label}</p>
                    ))}
                </div>
            ))}
        </div>
    )
}
