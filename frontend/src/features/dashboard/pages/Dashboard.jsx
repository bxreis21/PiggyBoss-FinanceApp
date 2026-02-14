import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import BanksList from "../../../components/dashboard/BanksList";
import BudgetsOverview from "../../../components/dashboard/BudgetsOverview";
import ExpensesManager from "../../../components/dashboard/ExpenseManager";
import ExpensesGraphs from "../../../components/dashboard/ExpensesGraphs";
import InvoicesOverview from "../../../components/dashboard/InvoicesOverview";
import MonthSummary from "../../../components/dashboard/MonthSummary";
import styles from "./Dashboard.module.css";
import NeedLogin from "../../../components/NeedLogin";

export default function Dashboard(){
    const { userInfo, loading } = useAuth()
    const [error, setError] = useState('')

    const [cards, setCards] = useState([])
    const [banks, setBanks] = useState([])
    const [balance, setBalance] = useState([])
    const [expensesCategory, setExpensesCategory] = useState([])
    const [expensesDistribution, setExpensesDistribution] = useState([])
    const [bills, setBills] = useState([])


    useEffect(() => {
        if (!userInfo && !loading) return

        document.title = "Dashboard"
        document.body.style.backgroundColor = '#17142a'

        return () => {
            document.title = ''
            document.body.style.backgroundColor = ''
        };
    }, [userInfo]);

    const DASHBOARD = (
        <div className={styles["dashboard"]}>

            <div className={styles["dashboard-item"]}>
                <MonthSummary />
            </div>

            <div className={styles["dashboard-item"]}>
                <ExpensesManager />
                <BanksList />
            </div>

            <div className={styles["dashboard-item"]}>
                <ExpensesGraphs />
            </div>

            <div className={styles["dashboard-item"]}>
                <BudgetsOverview />
                <InvoicesOverview />
            </div>
        </div>
    )

    if (loading) return <></>

    return (!userInfo && !loading) ? <NeedLogin /> : DASHBOARD
}
