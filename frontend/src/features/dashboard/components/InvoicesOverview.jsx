import * as dashboardServices from "../../services/dashboardServices"
import { useEffect, useState } from "react"
import PiggyBox from "../PiggyBox"
import styles from './Dashboard.module.css'

export default function InvoicesOverview() {

    const [bills, setBills] = useState([])
    const [billsTotal, setBillsTotal] = useState(0)
    
    const today = new Date()
    const month = today.getMonth() + 1
    const year = today.getFullYear()

    useEffect(() => {
        fetchData()
    }, [])

     const fetchData = async () => {
        const fetchedBills = await dashboardServices.fetchMonthBillTotal({ month, year })

        if (fetchedBills) {
            setBills(fetchedBills)
            const total = fetchedBills.reduce((acc, curr) => acc + curr.total, 0)
            setBillsTotal(total)
        }
    }

    const INVOICES_OVERVIEW = (
        <PiggyBox style = {{ width : "45%", height : "90%", minwidth : "300px", background : "#0f0b1f"}} >
                
            <div className={styles["dashboard-head"]}>
                <h4>Invoices</h4>
            </div>

            <div className={styles["dashboard-content-invoices"]} style = {{ }}>
                {
                    bills.map((element, index) => (
                        <PiggyBox key = {index} to="/login" style = {{  width:"90%", height : "25%", background : "#16102f", flexDirection:"row", justifyContent : 'space-between', alignItems : 'center', padding : '5%' }}>
                            <p>{element.card__name}</p>
                            <p>R$ {element.total}</p>
                        </PiggyBox>
                    ))
                }
                                
            </div>

            <div style = {{ margin: '5%', width: '85%', height: '10%', display: 'flex', justifyContent : 'space-between', alignItems : 'center' }}>
                <p>Total</p>
                <p>{billsTotal}</p>
            </div>

        </PiggyBox>
    )

    return INVOICES_OVERVIEW
}
