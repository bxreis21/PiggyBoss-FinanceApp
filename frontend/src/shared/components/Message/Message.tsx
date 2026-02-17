import styles from "./Message.module.css";

interface MessageProps {
    message: string;
    type: "success" | "error";
}

export default function Message({ message, type}: MessageProps){
    let class_name = "success-message"

    if (type == "error"){
        class_name = "error-message"
    }

    return <div className={styles[class_name]}>
        <p>{message}</p>
    </div>
}