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
                    <Link to="/cardsandbanks" className={styles['nav-link']}>Cards And Banks</Link>
                    <Link to="/transactions" className={styles['nav-link']}>Transactions</Link>
                    <Link to="/budgets" className={styles['nav-link']}>Budgets</Link>
                </div>
            ) : (
                <div className={styles['left-side']}>
                    <Link to="/">Piggy Boss</Link>
                </div>
            )}
            
            
            <div className={styles['right-side']}>
                {authContext?.userInfo ? (
                    <>
                        <span className={styles["user-info"]}>
                            Welcome, {authContext?.userInfo.full_name}
                        </span>
                        <button onClick={handleLogout} className={styles['logout-button']}>
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/" className={styles['nav-link']}>Login</Link>
                )}
                
            </div>
        </nav>
    );
    
    return NAVBAR;
}
