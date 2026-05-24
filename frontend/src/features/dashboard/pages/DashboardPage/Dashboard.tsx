// Layouts
import HeaderLayout from "../../layouts/Header.js";
import ListLayout from "../../layouts/List.js";

// Components
import PiggyBox from "../../../../shared/components/PiggyBox/PiggyBox.js";
import MoneyCard from "../../components/MoneyCard/MoneyCard.js";

// shared components
import TitlePrice from "../../../../shared/components/TitlePrice/TitlePrice.js";
import TitleFraction from "../../../../shared/components/TitleFraction/TitleFraction.js";
import BarGraph from '../../components/BarGraph/BarGraph.js'
import PizzaGraph from '../../components/PizzaGraph/PizzaGraph.js'

export default function Dashboard() {
    return (
        <div className="h-[95%] w-full p-[2%] grid grid-rows-[5fr_7fr] grid-cols-[4fr_2fr_2fr] gap-7">

            {/* Balance Overview */}

            <PiggyBox variant='primary'>
                <div className="h-full w-[95%]">
                    <HeaderLayout
                        headerCenter={<h2>balance overview</h2>}
                        headerLeft={<h3>this month</h3>}
                        headerRight={<h3>all banks</h3>}
                        body={
                            <div className="h-full w-full flex items-center">
                                <ListLayout>
                                    <div className="h-[55%] mt-6 w-full my-3">
                                        <MoneyCard title="Balance" number={12345.67} />
                                    </div>
                                    <TitlePrice title="Total Incomes" price={6789.01} />
                                    <TitlePrice title="Total Expenses" price={5432.10} />
                                </ListLayout>
                                <ListLayout>
                                    <div className="h-[55%] mt-6 w-full my-3">
                                        <MoneyCard title="Current Bill" number={12345.67} />
                                    </div>
                                    <TitlePrice title="Fixed Expenses" price={6789.01} />
                                    <TitlePrice title="Variable Expenses" price={5432.10} />
                                </ListLayout>
                            </div>                        
                        }
                    />
                </div>
            </PiggyBox>
            
            {/* Balance in Next Months */}

            <PiggyBox variant='primary'>
                <div className="h-full w-full p-2">
                    <HeaderLayout 
                        headerCenter={<h3>balance in next months</h3>} 
                        body={
                            <div className="h-full mt-2 flex items-center">
                                <ListLayout>
                                    <div className="h-16 w-full">
                                        <PiggyBox variant="secondary">  
                                            <div className="h-full w-full px-5 flex justify-center ">
                                                <TitlePrice title="May" price={6789.01} />
                                            </div>
                                        </PiggyBox>
                                    </div>
                                    <div className="h-16 w-full">
                                        <PiggyBox variant="secondary">  
                                            <div className="h-full w-full px-5 flex justify-center ">
                                                <TitlePrice title="May" price={6789.01} />
                                            </div>
                                        </PiggyBox>
                                    </div>
                                </ListLayout>
                            </div>
                        } 
                    />
                </div>
            </PiggyBox>

            {/* Bills */}

            <PiggyBox variant='primary'>
                <div className="h-full w-full p-2">
                    <HeaderLayout 
                        headerCenter={<h3>Bills</h3>} 
                        body={
                            <div className="h-full mt-2 flex items-center">
                                <ListLayout>
                                    <div className="h-16 w-full">
                                        <PiggyBox variant="secondary">  
                                            <div className="h-full w-full px-5 flex justify-center ">
                                                <TitlePrice title="May" price={6789.01} />
                                            </div>
                                        </PiggyBox>
                                    </div>
                                    <div className="h-16 w-full">
                                        <PiggyBox variant="secondary">  
                                            <div className="h-full w-full px-5 flex justify-center ">
                                                <TitlePrice title="May" price={6789.01} />
                                            </div>
                                        </PiggyBox>
                                    </div>
                                </ListLayout>
                            </div>
                        }
                    />
                </div>
            </PiggyBox>

            {/* Expenses Overview */}

            <PiggyBox variant='primary'>
                <div className="h-full w-full px-6">
                    <HeaderLayout 
                        headerCenter={<h2>Expenses Overview</h2>}
                        headerLeft={<h3>Last Transactions</h3>}
                        headerRight={<h3>History Category</h3>}
                        body={
                            <div className="h-full w-full flex items-center justify-center">
                                <div className="w-[90%] h-[85%]">
                                    <BarGraph data={{ 
                                        name: 'Expenses',
                                        values: [400, 300, 200, 500, 350], labels: ['Jan','Feb','Mar','Apr','May'] 
                                    }}/>
                                </div>
                            </div>
                        }
                    />
                </div>
            </PiggyBox>

            {/* Distribution */}

            <PiggyBox variant='primary'>
                <div className="h-full w-full p-2 px-5">
                    <HeaderLayout 
                        headerCenter={<h3>Distribution</h3>}
                        headerLeft={<h4>expenses</h4>}
                        headerRight={<h4>income</h4>}
                        body={
                            <div className="h-full w-full flex items-center justify-center">
                                <div className="w-[80%] h-[80%]">
                                    <PizzaGraph data={{ 
                                        name: 'Distribution', 
                                        values: [45, 25, 15, 10, 5], 
                                        labels: ['Rent','Food','Transport','Utilities','Other'] 
                                    }} />
                                </div>
                            </div>
                        }
                    />
                </div>
            </PiggyBox>
                        
            {/* Budget */}

            <PiggyBox variant='primary'>
                 <div className="h-full w-full p-2">
                    <HeaderLayout 
                        headerCenter={<h3>balance in next months</h3>} 
                        body={
                            <div className="h-full mt-2 flex items-center">
                                <ListLayout>
                                    <div className="h-16 w-full">
                                        <PiggyBox variant="secondary">  
                                            <div className="h-full w-full px-5 flex justify-center ">
                                                <TitleFraction title="Food" left={6789.01} right={10000} />
                                            </div>
                                        </PiggyBox>
                                    </div>
                                    <div className="h-16 w-full">
                                        <PiggyBox variant="secondary">  
                                            <div className="h-full w-full px-5 flex justify-center ">
                                                <TitleFraction title="Transport" left={6789.01} right={10000} />
                                            </div>
                                        </PiggyBox>
                                    </div>
                                </ListLayout>
                            </div>
                        } 
                    />
                </div>
            </PiggyBox>

        </div>
    );
}