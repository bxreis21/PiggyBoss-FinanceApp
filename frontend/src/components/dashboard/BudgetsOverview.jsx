import * as dashboardServices from "../../services/dashboardServices";
import { useEffect, useState } from "react";
import PiggyBox from "../PiggyBox";
import styles from "./Dashboard.module.css";

export default function BudgetsOverview() {
  const [budgets, setBudgets] = useState([]);
  const [totalBudgetsLimit, setTotalBudgetsLimit] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const fetchedBudgets = await dashboardServices.fetchMonthlyBudgets({ month, year });

    if (fetchedBudgets) {
      setBudgets(fetchedBudgets);
      
      const spentSum = fetchedBudgets.reduce((acc, curr) => acc + curr.spent, 0);
      const totalLimit = fetchedBudgets.reduce((acc, curr) => acc + parseFloat(curr.limit_value), 0);
      setTotalSpent(spentSum);
      setTotalBudgetsLimit(totalLimit);
    }
  };

  const BUDGETS_OVERVIEW = (
    <PiggyBox style={{ width: "45%", height: "90%", minWidth: "300px", background: "#0f0b1f" }}>
      <div className={styles["dashboard-head"]}>
        <h4>Budgets</h4>
      </div>

      <div className={styles["dashboard-content-invoices"]}>
        {budgets.map((element, index) => (
          <PiggyBox key = {index} to="/login" style = {{  width:"90%", height : "25%", background : "#16102f", flexDirection:"row", justifyContent : 'space-between', alignItems : 'center', padding : '5%' }}>
            
            <p>{element.category_name}</p>
            <p>R$ {parseFloat(element.spent).toFixed(2)} / {parseFloat(element.limit_value).toFixed(2)}</p>
          </PiggyBox>
        ))}
      </div>
      
      <div style = {{ margin: '5%', width: '85%', height: '10%', display: 'flex', justifyContent : 'space-between', alignItems : 'center' }}>
        <p>Total</p>
        <p>R$ {totalSpent.toFixed(2)} / {totalBudgetsLimit.toFixed(2)}</p>
      </div>
    </PiggyBox>
  )

  return BUDGETS_OVERVIEW;
}
