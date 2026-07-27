import styles from './Finance.module.css'
import { useEffect, useState } from 'react'

import Centralize from '../../../account/layouts/Centralize.js'
import BankCard from '../../components/BankCard/BankCard.js'
import PiggyBox from '../../../../shared/components/PiggyBox.js'
import TransactionTable from '../../components/TransactionTable/TransactionTable.js'
import Popup from '../../components/Popup.js'
import BankForm from '../../components/BankForm.js'

import type { TransactionSchema, BankAccountSchema } from '../../schemas.js'
import { fetchFinanceData } from '../../service.js'


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
    const [selectedBankId, setSelectedBankId] = useState<number | null>(null);
    const [selectedTransactions, setSelectedTransactions] = useState<Array<TransactionSchema>>([]);
    const [transactions, setTransactions] = useState<Array<TransactionSchema>>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isCreateBankOpen, setIsCreateBankOpen] = useState(false);

    const handleSelectBank = (id: number) => {
        setSelectedBankId(id);
    };

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

    useEffect(() => {
        if (banks.length > 0 && selectedBankId === null) {
            const firstBank = banks[0];
            if (firstBank) {
                setSelectedBankId(firstBank.id);
            }
        }
        setSelectedTransactions(transactions.filter(transaction => transaction.bank === selectedBankId));
    }, [banks, selectedBankId])
    
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
                                <p 
                                    className='mr-3 cursor-pointer hover:text-[var(--strong-pink)] 
                                    transition-colors duration-200' 
                                    onClick={() => setIsCreateBankOpen(true)}
                                >
                                    Create
                                </p>
                            </div>
                            <div className={styles.banks__content}>
                                {banks.map((bank) => (
                                    <div 
                                        key={bank.id} 
                                        className='w-[95%] h-[20%] cursor-pointer'
                                        onClick={() => handleSelectBank(bank.id)}
                                    >
                                        <BankCard 
                                            bank_name={bank.institution.name} 
                                            balance={123121} 
                                            credit_bill={123123} 
                                            selected={selectedBankId === bank.id} 
                                        />
                                    </div>
                                ))}
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
                            <TransactionTable header={transactionHeader} content={selectedTransactions} />
                        </div>
                    </PiggyBox>
                </div>
            </Centralize>

            <Popup
                title="Create Bank Account" 
                isOpen={isCreateBankOpen} 
                onClose={() => setIsCreateBankOpen(false)}
            >
                <div className="w-[30%] flex flex-col gap-4 p-4">
                    <BankForm onClose={() => setIsCreateBankOpen(false)} />
                </div>
            </Popup>
        </div>
    )
}
