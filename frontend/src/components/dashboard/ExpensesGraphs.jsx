import * as dashboardServices from "../../services/dashboardServices"
import PiggyBox from "../PiggyBox"
import BarGraph from "../BarGraph"
import styles from './Dashboard.module.css'
import { useEffect, useState } from "react";

export default function ExpensesGraphs() {
  const [graphData, setGraphData] = useState(null);
  const today = new Date()
  const month = today.getMonth() + 1
  const year = today.getFullYear()

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    const fetchedData = await dashboardServices.fetchCategoryExpensesDistribution({ month, year })

    if(fetchedData){
      const labels = fetchedData.map(item => item.category);
      const values = fetchedData.map(item => item.total);
  
      const formattedData = {
        labels: labels,
        datasets: [
          {
            label: 'Despesas por Categoria',
            data: values,
            backgroundColor: '#710d9b',
          },
        ],
      };

        setGraphData(formattedData);
    }
  }

  const EXPENSES_GRAPHS = (
      <PiggyBox style = {{ width : "95%", height : "90%", background : "#0f0b1f" }}>
          <div className={styles["dashboard-head"]}>
              <h4 >Expenses Planning by Category</h4>
          </div>
          <div className={styles["dashboard-content-expenses-planning"]} style={{ width: '95%', height: '80%' }}>
              {graphData ? <BarGraph data={graphData} /> : <p>Loading data...</p>}
          </div>
      </PiggyBox>
  )

  return EXPENSES_GRAPHS
}
