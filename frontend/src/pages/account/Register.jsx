import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Account.module.css";
import API from "../../api";
import logo from "../../assets/logo.png";
import FormField from "../../components/FormField"; 
import PinkButton from "../../components/PinkButton";
import DarkBox from "../../components/DarkBox";
import Message from "../../components/Message";

export default function Register() {

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    password1: '',
    password2: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password1 !== formData.password2) {
      setError('Passwords do not match');
      return;
    }
    try {
      const dataToSend = { 
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password1,
        phone_number: formData.phone_number || null,
        date_of_birth: formData.date_of_birth || null
      };
      const response = await API["account"].post('/register/', dataToSend);
      setError('');
      navigate('/', { state: { successMessage: 'Cadastro realizado com sucesso!' } });;
      
    } catch (err) {
      if (err.response?.data){
        setError(Object.values(err.response.data).flat().join(' '));
      } else {
        setError('Erro no registro.');
      }
    }
  };

  const FIELDS = [
    { label: 'First Name', name: 'first_name', type: 'text', placeholder: 'Enter your first name', required: true, width: '80%'},
    { label: 'Last Name', name: 'last_name', type: 'text', placeholder: 'Enter your last name', required: true, width: '80%'},
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email', required: true, width: '80%'},
    { label: 'Password', name: 'password1', type: 'password', placeholder: 'Enter your password', required: true, width: '80%'},
    { label: 'Confirm Password', name: 'password2', type: 'password', placeholder: 'Confirm your password', required: true, width: '80%'},
  ];

  const REGISTER_PAGE = (
    <div className={styles['account-page']}>
        <DarkBox width="20%" height="80%"  minwidth="280px" minheight="700px">

          <div style={{ height: '15%', margin: '5% 0 0 0' }}>
            <img src={logo} alt="Logo" className={styles['logo']} />
          </div>

          <form onSubmit={handleSubmit} style={{ width: '100%', height: '70%'}}>
            <div className={styles['form-container']}>
            {FIELDS.map((field) => (
              <FormField
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type} 
                value={formData[field.name]}
                onChange={handleChange} 
                placeholder={field.placeholder}
                required={field.required}
                width={field.width}
              />
            ))}
            <PinkButton text="Sign up" width="35%" height="9%" margin="3% 0 0 0"/>
            </div>
          </form>

          <div style={{ padding: "5% 0 0 0", height: "8%" }}>
            <p>Already have an account? <Link to="/" style={{ textDecoration: 'underline', color: 'inherit' }} >Sign in</Link></p>
          </div>

          <Message message={error} type="error" style={{ height: '5%' }} />
        </DarkBox>
      </div>
  )

  return REGISTER_PAGE
}
