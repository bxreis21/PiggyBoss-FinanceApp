import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../../../assets/images/logo.png";

import Centralize from "../../layouts/Centralize.js";
import FormContainer from "../../layouts/FormContainer.js";

import Image from "../../../../shared/components/Image/Image.js";
import FormField from "../../../../shared/components/FormField/FormField.jsx";
import PinkButton from "../../../../shared/components/PinkButton/PinkButton.js";
import PiggyBox from "../../../../shared/components/PiggyBox/PiggyBox.js";
import Message from "../../../../shared/components/Message/Message.js"; 
import { useAuth } from '../../../../app/providers/AuthProvider.jsx';


export function Login() {

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ email: '', password: '',});
  const [error, setError] = useState('');

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const context = useAuth();
  const { login } = context || {};

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (loading) return
    if (typeof login !== 'function') {
      setError('Auth provider unavailable.')
      setLoading(false)
      return
    }

    setLoading(true)

    try {
      await login(formData)
      navigate('/dashboard')

    } catch (err: any) {
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
    <Centralize>
      <div className="h-[55%] w-[20%] min-w-[400px] min-h-[300px]" >

        <PiggyBox variant="primary">

          <Image src={logo} size="lg" />

          <form onSubmit={handleSubmit} style={{ width: '100%', height: '55%'}}>
            <FormContainer>
              <FormField
                key="email"
                name="email"
                label="E-mail"
                type="email" 
                value={formData.email}
                onChange=  {handleChange} 
                placeholder="Enter your e-mail" 
                required={true}
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
              />

              <div className="mt-1">
                <Link to="/forgot-password" className="underline">
                  Forgot password?
                </Link>
              </div>

              <PinkButton text="Sign in"/>

            </FormContainer>  
          </form>

          <div>
            <p>Don't have an account? <Link to="/register" style={{ textDecoration: 'underline', color: 'inherit' }}>Sign up</Link></p>
          </div>

          <Message message={error} type="error"/>

        </PiggyBox>
      </div>
    </Centralize>
  );

  return LOGIN_PAGE
};
