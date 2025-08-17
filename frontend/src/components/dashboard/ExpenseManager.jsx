import { useState, useEffect } from "react";
import * as financeServices from "../../services/financeServices";
import PiggyBox from "../PiggyBox";
import SelectButton from "../SelectButton";
import SimpleRadio from "../SimpleRadio";
import PinkButton from "../PinkButton";
import styles from "./Dashboard.module.css";

export default function ExpensesManager() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const fetchedCards = await financeServices.fetchCards();
        if (fetchedCards) {
            const names = fetchedCards.map(item => item.name);
            setCards(names);
        }
    };

    return (
        <PiggyBox style={{ width: "45%", height: "90%", background: "#0f0b1f" }}>
            <div className={styles["dashboard-head"]}>
                <h4>Expenses</h4>
            </div>

            <div className={styles["dashboard-content-expense"]}>
                <SelectButton label="Card" options={cards} width="85%" />
                <SimpleRadio options={["Credit", "Debit"]} width="70%" />
                <PinkButton
                    text="Add Expense"
                    style={{
                        width: "50%",
                        height: "25%",
                        backgroundColor: "#f1109b",
                        minWidth: "100px",
                        minHeight: "60px"
                    }}
                />
            </div>
        </PiggyBox>
    );
}
