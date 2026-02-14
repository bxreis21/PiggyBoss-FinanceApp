import styles from "./Image.module.css"




export default function Image(props: { scr: string , style?: any }) {
    return <img src={props.scr} alt="Logo" style={{ ...props.style }} className={styles["logo"]}/>
}
