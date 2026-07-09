import { Link } from "react-router-dom"
import PiggyBox from "../../../shared/components/PiggyBox.js"
import MoneyCard from "../../dashboard/components/MoneyCard/MoneyCard.js"
import BarGraph from "../../../shared/components/BarGraph.js"

export default function Home() {

    return (
        <div className="w-full h-[90%] grid grid-cols-2 grid-rows-[100%]">

            <div className="h-full flex flex-col justify-center px-[5%] gap-2">
                <h1 className="text-8xl font-light leading-tight">
                    Manage your finances with ease.
                </h1>

                <h3 className="text-2xl font-medium text-gray-500">
                    Track your expenses, analyze speending patterns, and manage your cards with Piggy Boss.
                </h3>
                
                <Link to="/account/login" className="mt-8 inline-flex items-center text-xl 
                font-bold gap-2 transition-colors duration-200 hover:text-[var(--strong-pink)]">
                    <span>Get Started</span>
                    <span aria-hidden="true"> →</span>
                </Link>
            </div>
            
            <div className="flex items-center justify-center">
                <div className="w-[90%] h-[80%]">
                    <PiggyBox variant="primary">
                        <div className="w-[90%] h-full flex flex-col items-center justify-around py-4">
                            <div className="w-full h-[25%] flex gap-8 mt-4">
                                <div className="w-1/2">
                                    <MoneyCard title="Total Expenses" number={1000.0}/>
                                </div>
                                <div className="w-1/2">
                                    <MoneyCard title="Available Balance" number={1000.0}/>
                                </div>
                            </div>

                            <div className="w-full h-[60%] min-h-[260px]">
                                <PiggyBox variant="secondary">
                                    <div className="w-full h-full p-4 flex flex-col">
                                        <h2 className="mb-4">Spending Overview</h2>
                                        <div className="w-full flex-1">
                                            <BarGraph />
                                        </div>
                                    </div>
                                </PiggyBox>
                            </div>
                        </div>
                    </PiggyBox>
                </div>
            </div>
        </div>
    )
}
