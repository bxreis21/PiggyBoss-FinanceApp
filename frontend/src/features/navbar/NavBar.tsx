import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../app/providers/AuthProvider.js";
import Image from "../../shared/components/Image/Image.js";

export default function NavBar(){
    const authContext = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        authContext?.logout();
        navigate("/");
    };

    const NAVBAR = (
        <nav>
            {authContext?.userInfo ? (
                <div className={styles['left-side']}>
                    <Image src={logo} size="sm" />  
                    <Link to="/dashboard" className={styles['nav-link']}>Dashboard</Link>
                    <Link to="/finance" className={styles['nav-link']}>Finance</Link>
                </div>
            ) : (
                <div></div>
            )}
            
            
            <div className={styles['right-side']}>
                {authContext?.userInfo ? (
                    <>
                        <span className={styles["user-info"]}>
                            Welcome, {authContext?.userInfo.full_name}
                        </span>
                        <span className={styles.divider} />
                        <button onClick={handleLogout} className={styles['logout-button']}>
                            Logout
                        </button>
                    </>
                ) : (
                    <div></div>
                )}
                
            </div>
        </nav>
    );
    
    return NAVBAR;
}
