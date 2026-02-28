import styles from './Finance.module.css'

import Centralize from '../../../account/layouts/Centralize.js'

import BankCard from '../../components/BankCard/BankCard.js'
import PiggyBox from '../../../../shared/components/PiggyBox/PiggyBox.js'

export default function Finance() {
    
    const FINANCE_PAGE = (
        <div className="grid grid-cols-[35%_65%] h-[95%] p-50">
            
            <Centralize>
                <div className='h-[90%] w-[80%]'>

                    <PiggyBox variant='primary' border={true}>
                        <div className={styles.finance}>
                            <div className={styles.banks__header}>
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
                <div className='h-[90%] w-[100%] mr-20'>

                    <PiggyBox variant='primary' border={true}>
                        <div>
                            <h1>oi</h1>
                        </div>
                    </PiggyBox>
                    
                </div>
            </Centralize>
            
        </div>
    )
    
    
    return FINANCE_PAGE
}
