import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../context/AuthContext";

export default function NavBar(){
    const { userInfo, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const NAVBAR = (
        <nav>
            
                {userInfo ? (
                    <div className={styles['left-side']}>
                        <Link to="/"> <img src={logo} alt="Logo" className={styles['logo']} /> </Link>
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
                {userInfo ? (
                    <>
                        <span className={styles["user-info"]}>
                            Welcome, {userInfo.full_name}
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
