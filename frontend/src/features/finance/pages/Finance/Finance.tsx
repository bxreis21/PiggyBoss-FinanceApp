import styles from './Finance.module.css'
import { useEffect, useState } from 'react'

import Centralize from '../../../account/layouts/Centralize.js'
import BankCard from '../../components/BankCard/BankCard.js'
import PiggyBox from '../../../../shared/components/PiggyBox.js'
import PiggyTable from '../../components/PiggyTable/PiggyTable.js'

import type { TransactionSchema, BankAccountSchema } from '../../schemas.js'
import { fetchFinanceData } from '../../utils.js'


const transactionHeader = [
        { name: 'Date', length: '3' },
        { name: 'Transaction', length: '5' },
        { name: 'Category', length: '5' },
        { name: 'Description', length: '6' },
        { name: 'Third-party', length: '3' },
        { name: 'Value', length: '4' }
    ]


export default function Finance() {
    const [banks, setBanks] = useState<Array<BankAccountSchema>>([]);
    const [transactions, setTransactions] = useState<Array<TransactionSchema>>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function initializePage() {
            setLoading(true)
            setError("")

            try {
                await Promise.all([
                    fetchFinanceData('bank-account', setBanks, setError, 'Failed to load banks.'),
                    fetchFinanceData('transaction', setTransactions, setError, 'Failed to load transactions.')
                ]);
            } catch (err) {
                setError('An unexpected error occurred.')
            } finally {
                setLoading(false)
            }
        }
        initializePage();
    }, [])
    
    if (loading) {
        return (
            <div className="flex items-center justify-center h-[90%]">
                <p>Loading transactions...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-[90%]">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-[30%_70%] h-[95%] p-50">
            <Centralize>
                <div className='h-[90%] w-[85%]'>
                    <PiggyBox variant='primary' border={true}>
                        <div className={styles.finance}>
                            <div className={styles.header}>
                                <h3 className='ml-3'> Banks Accounts </h3>
                                <h3 className='mr-3'> Add </h3>
                            </div>
                            <div className={styles.banks__content}>
                                <div className='w-[95%] h-[20%]'>
                                    <BankCard bank_name="BTG Pactual" balance={1000.00} credit_bill={500.00} selected={true} />
                                </div>
                                <div className='w-[95%] h-[20%]'>
                                    <BankCard bank_name="BTG Pactual" balance={1000.00} credit_bill={500.00} />
                                </div>
                                <div className='w-[95%] h-[20%]'>
                                    <BankCard bank_name="BTG Pactual" balance={1000.00} credit_bill={500.00} />
                                </div>
                            </div>
                        </div>
                    </PiggyBox>
                </div>
            </Centralize>

            <Centralize>
                <div className='h-[90%] w-[100%] mr-10'>
                    <PiggyBox variant='primary' border={true}>
                        <div className={styles.finance}>
                            <div className={styles.header}>
                                <p className='ml-4'>Expense</p>
                                <h3 className='mx-3'>Transactions</h3>
                                <p className='mr-4'>Mar</p>
                            </div>
                            <PiggyTable header={transactionHeader} content={transactions} />
                        </div>
                    </PiggyBox>
                </div>
            </Centralize>
        </div>
    )
}
