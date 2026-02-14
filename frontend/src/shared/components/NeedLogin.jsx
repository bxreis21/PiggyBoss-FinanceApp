
import PiggyBox from "./PiggyBox";

export default function NeedLogin({ style }) {
    const CUSTOM_STYLE = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '95%',
        ...style
    }

    return <div style={ CUSTOM_STYLE }><PiggyBox style={{ width : '30%', height: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} ><p>You need to be logged in.</p></PiggyBox></div>

}
