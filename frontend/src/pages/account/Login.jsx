import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Account.module.css"
import logo from "../../assets/images/logo.png";
import Image from "../../components/Image";
import FormField from "../../components/FormField";
import PinkButton from "../../components/PinkButton";
import PiggyBox from "../../components/PiggyBox";
import Message from "../../components/Message"; 
import { useAuth } from '../../context/AuthContext';


export default function Login() {
  useEffect(() => {
    document.title = "Login"
    document.body.style.background = 'linear-gradient(135deg, #1E1E2F, #9B59B6)';
    return () => {
      document.title = ''
      document.body.style.background = '';
    };
  }, []);

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ email: '', password: '',});
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return

    setLoading(true)
    try {
      await login(formData)
      navigate('/dashboard')
    } catch (err) {
      if (err.response?.data){
        setError(Object.values(err.response.data).flat().join(' '))
      } else {
        setError('Error.')
      }
    } finally {
      setLoading(false);
    }
  };
  const LOGIN_PAGE = (
    <div className={styles['account-page']}>
        <PiggyBox style = {{ width : "20%", height : "55%", maxHeight: "600px" , minWidth : "280px", minHeight : "500px", background : "#2C2C3D"}}>

          <div style={{ height: '25%', margin: '5% 0 0 0' }}> 
            <Image scr={logo} />
          </div>

          <form onSubmit={handleSubmit} style={{ width: '100%', height: '55%'}}>
            <div className={styles['form-container']}>
              <FormField
                key="email"
                name="email"
                label="E-mail"
                type="email" 
                value={formData.email}
                onChange=  {handleChange} 
                placeholder="Enter your e-mail" 
                required={true}
                style = {{ width: "80%" }}
              />

              <FormField
                key="password"
                name="password"
                label="Password"
                type="password" 
                value={formData.password}
                onChange=  {handleChange} 
                placeholder="Enter your password" 
                required={true} 
                style = {{ width: "80%" }}
              />

              <div style={{ width: "80%", textAlign: "center", marginBottom: "1rem" }}>
                <Link
                  to="/forgot-password"
                  style={{
                    textDecoration: "underline",
                    color: "inherit",
                    fontSize: "0.95rem",
                    cursor: "pointer"
                  }}
                >
                  Forgot password?
                </Link>
              </div>

              <PinkButton text="Sign in" width="35%" height="15%" disabled={loading}/>
              </div>
          </form>

          <div style={{ padding: "0.5rem 0 0 0", height: "10%" }}>
            <p>Don't have an account? <Link to="/register" style={{ textDecoration: 'underline', color: 'inherit' }} >Sign up</Link></p>
          </div>

          <Message message={error} type="error" style={{ height: '5%' }} />
        </PiggyBox>
    </div>
  );

  return LOGIN_PAGE
}
