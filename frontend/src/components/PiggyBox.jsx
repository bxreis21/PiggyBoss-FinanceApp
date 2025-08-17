import { heIL } from '@mui/material/locale';
import { Link } from "react-router-dom";
import styles from './PiggyBox.module.css';
import { dark_colors, white_colors}  from '../styles/colors';

export default function PiggyBox({ children, to, style }){
    const CUSTOM_STYLE = {
        backgroundColor: dark_colors.card,
        width : "100%",
        height : "100%",
        textDecoration :"None", 
        ...style,
    };

    const Tag = to ? Link : 'div'

    const PiggyBox = <Tag to={to} className={styles['dark-box']} style={{...CUSTOM_STYLE }}>
        {children}
    </Tag>

    return PiggyBox
}
