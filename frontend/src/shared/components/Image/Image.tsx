import styles from "./Image.module.css"

interface ImageProps {
    src: string;
    size: "sm" | "md" | "lg";
    disabled?: boolean;
}

export default function Image({src, size, disabled}: ImageProps) {
    return <div 
    className={[
        styles.logo,
        styles[size || "sm"],
        disabled && styles.disabled,
    ].join(" ")}>
        <img src={src} alt="Logo" className={styles["logo"]}/>
    </div> 
}
