import styles from './FormField.module.css';

export default function FormField({ name, label, type, value, onChange, placeholder, required = false,  width}){
    const style = {
        width: width || 'auto',
    };
    
    return <div className={styles['form-field']} style={style}>
        <label htmlFor={label}>{label}</label>
        <input
            type={type}
            id={label}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required = {required}
        />  
    </div>
}
