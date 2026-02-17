import styles from "./Image.module.css"

interface ImageProps {
    scr: string;
    size: "sm" | "md" | "lg";
    disabled?: boolean;
}

export default function Image({scr, size, disabled}: ImageProps) {
    return <div 
    className={[
        styles.logo,
        styles[size || "sm"],
        disabled && styles.disabled,
    ].join(" ")}>
        <img src={scr} alt="Logo" className={styles["logo"]}/>
    </div> 
}
