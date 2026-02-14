import styles from "./Message.module.css";

export default function Message({ message, type = "success", style}){
    let class_name = "success-message"

    if (type == "error"){
        class_name = "error-message"
    }

    return <div className={styles[class_name]} style={{ ...style}}>
        <p>{message}</p>
    </div>
}