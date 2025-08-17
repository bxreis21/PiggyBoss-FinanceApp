import { useState } from "react";
import styles from "./Account.module.css";
import PiggyBox from "../../components/PiggyBox";
import FormField from "../../components/FormField";
import PinkButton from "../../components/PinkButton";
import { Link } from "react-router-dom";
import API from "../../utils/api";
import modalStyles from "./ForgotPassword.module.css";
import logo from "../../assets/images/logo.png";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({ emailOrPhone: "" });
  const [showMsg, setShowMsg] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API["account"].post("/forgot-password/", formData);
      setShowMsg(true); // Mostra o modal personalizado
    } catch (err) {
      alert("Error sending link. Please try again.");
    }
  };

  return (
    <>
      {showMsg && (
        <div className={modalStyles["modal-overlay"]}>
          <div className={modalStyles["modal-content"]}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <img src={logo} alt="Logo" style={{ height: "32px" }} />
              <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>PiggyBoss</span>
            </div>
            <p>If the email or number exists, a link has been sent to reset your password.</p>
            <button
              className={modalStyles["modal-button"]}
              onClick={() => setShowMsg(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
      <div className={styles['account-page']}>
        <PiggyBox style = {{width:"30%", height:"60%", minwidth:"280px", minheight:"500px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "5% 0 0 0" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🔒</div>
          </div>
          <form onSubmit={handleSubmit} style={{ width: '100%', height: '55%' }}>
            <div className={styles['form-container']} style={{ alignItems: "center" }}>
              <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Problems logging in?</h2>
              <p style={{ textAlign: "center", marginBottom: "1.5rem", color: "#ccc", fontSize: "1rem" }}>
                Enter your email or number and we'll send you a link to access your account again.
              </p>
              <FormField
                key="emailOrPhone"
                name="emailOrPhone"
                label=""
                type="text"
                value={formData.emailOrPhone}
                onChange={handleChange}
                placeholder="Email or number"
                required={true}
                style={{ width: "80%"}}
              />
              <PinkButton text="Send login link" width="80%" height="2.5rem" style={{ margin: "1rem 0" }} />
              <div style={{ textAlign: "center", margin: "1rem 0", color: "#ccc", fontSize: "0.95rem" }}>
                Can't reset your password?
              </div>
              <div style={{ display: "flex", alignItems: "center", margin: "1rem 0" }}>
                <hr style={{ flex: 1, border: "none", borderTop: "1px solid #333" }} />
                <span style={{ margin: "0 1rem", color: "#ccc" }}>OR</span>
                <hr style={{ flex: 1, border: "none", borderTop: "1px solid #333" }} />
              </div>
              <Link to="/register" style={{ textAlign: "center", color: "#fff", fontWeight: "bold", textDecoration: "none", display: "block", marginBottom: "1rem" }}>
                Create new account
              </Link>
              <Link to="/" style={{ display: "block", width: "100%", background: "#222", color: "#fff", padding: "0.75rem 0", borderRadius: 4, textAlign: "center", fontWeight: "bold", textDecoration: "none", marginTop: "1rem" }}>
                Back to login
              </Link>
            </div>
          </form>
        </PiggyBox>
      </div>
    </>
  );
}
