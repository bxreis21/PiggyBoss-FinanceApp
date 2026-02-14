import { useAuth } from "../../context/AuthContext";
import API from "../../utils/api";
import { useState, useEffect } from "react";
import styles from "./TransactionsView.module.css";
import * as financeServices from "../../services/financeServices"
import SelectTabs from "../../../shared/components/SelectTabs";
import SelectButton from "../../../shared/components/SelectButton";

export default function TransactionsView({ bank = null, card = null, category = null }){

    const monthNames = [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
        "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ]

    const today = new Date()
    const currentMonthIndex = today.getMonth()
    const currentYear = today.getFullYear()

    const { userInfo, loading } = useAuth()
    const [transactions, setTransactions] = useState([])
    const [month, setMonth] = useState(monthNames[currentMonthIndex])
    const [year, setYear] = useState(currentYear)
    const [type, setType] = useState()
    const [method, setMethod] = useState()

    useEffect(() => {
        if (!userInfo && !loading) return
        fetchData()

    }, [userInfo, month, year])

    const fetchData = async () => {
        if (!userInfo || loading) return;

        const data = await financeServices.fetchTransactions();
        setTransactions(data);
    };

    const handleMonthSelect = (month) => {

        const monthMap = {
            Jan: 1, Fev: 2, Mar: 3, Abr: 4, Mai: 5, Jun: 6,
            Jul: 7, Ago: 8, Set: 9, Out: 10, Nov: 11, Dez: 12
        }

        return monthMap[month]
    }

    const TRANSACTIONS_VIEW = (
        <>  
            <div style={{ width: "100%", height: "8%", padding: "0% 1%", display : "flex", justifyContent: "space-between", alignItems: "center"}}>
                <SelectTabs options={['expense', 'income']} onSelect={setType} styles={{ width: "35%" }} indicator={false} />
                <h3>Transactions Resume</h3>
                <SelectTabs options={['debit', 'credit']} onSelect={setMethod} styles={{ width: "35%" }} indicator={false} />
            </div>
            
            <SelectTabs options={monthNames} onSelect={setMonth} def={currentMonthIndex}/>

            <ul className={styles["transactions-list"]}>
            {transactions
            .filter(tx => {
                console.log(tx)
                console.log(category)
                console.log(card)
                console.log(bank)
                const txMonth = new Date(tx.date).getMonth() + 1
                return (
                txMonth === handleMonthSelect(month) &&
                // ( bank == null || tx.bank === bank ) && 
                // ( card == null || tx.card === card ) &&
                // ( category == null || tx.category === category ) &&
                ( !type || tx.transactions_type === type ) &&
                ( !method || tx.payment_method === method )
                )
            })
            .map((tx) => (
                <li key={tx.id} className={styles["transaction-item"]} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                    <span style={{ flex: 2, paddingLeft: '10px' }}><strong>{tx.name}</strong></span>
                    <span style={{ flex: 1, textAlign: 'center' }}>R$ {parseFloat(tx.amount).toFixed(2)}</span>
                    <span style={{ flex: 1, textAlign: 'center' }}>{tx.transactions_type}</span>
                    <span style={{ flex: 1, textAlign: 'center'}}>{tx.payment_method}</span>
                    <span style={{ flex: 1, textAlign: 'center' }}>{tx.date}</span>
                </li>
            ))}
            </ul>
            <div style={{ width: "90%", display: "flex", justifyContent: "space-between" }}>
                <p>Total</p>
                <p>$ {transactions
                .filter(tx => {
                    const txMonth = new Date(tx.date).getMonth() + 1
                    return (
                        txMonth === handleMonthSelect(month)
                    )
                })
                .reduce((sum, tx) => sum + parseFloat(tx.amount), 0)}
                </p>
            </div>
        </>
    )

    return TRANSACTIONS_VIEW
}
