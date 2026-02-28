import styles from './Finance.module.css'
import PiggyBox from '../../../../shared/components/PiggyBox/PiggyBox.js'

export default function Finance() {
    
    const FINANCE_PAGE = (
        <div className={styles['finance-page']}>

            <PiggyBox variant='primary'>
                <div>
                    <h1>oi</h1>
                </div>
            </PiggyBox>
        
            <PiggyBox variant='primary'>
                <div>
                    <h1>oi</h1>
                </div>
            </PiggyBox>
            
        </div>
    )
    
    
    return FINANCE_PAGE
}
