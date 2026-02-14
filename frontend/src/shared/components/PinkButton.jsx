import styles from './PinkButton.module.css';

export default function PinkButton({ text, style }) {
    const customstyle = {
        width: 'auto',
        height: 'auto',
        margin: '0',
        backgroundColor: '#FF66C4',
        ...style
    };

    return <button type="submit" className={styles['pink-button']} style={customstyle}>
        {text}
    </button>
}
