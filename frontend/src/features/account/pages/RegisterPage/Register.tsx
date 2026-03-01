import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../../../assets/images/logo.png";

import { registerUser } from "../../service.js";

import Centralize from "../../layouts/Centralize.js";
import FormContainer from "../../layouts/FormContainer.js";

import Image from "../../../../shared/components/Image/Image.js";
import FormField from "../../../../shared/components/FormField/FormField.jsx";
import PinkButton from "../../../../shared/components/PinkButton/PinkButton.js";
import PiggyBox from "../../../../shared/components/PiggyBox/PiggyBox.js";
import Message from "../../../../shared/components/Message/Message.js"; 
import type { RegisterForm, RegisterFormFields } from "../../types.js";

export default function Register() {

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState<RegisterForm>({
    first_name: '',
    last_name: '',
    email: '',
    date_of_birth: new Date(),
    password1: '',
    password2: '',
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formData.password1 !== formData.password2) {
      setError('Passwords do not match');
      return;
    }
    try {
      registerUser({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        date_of_birth: formData.date_of_birth,
        password: formData.password1
      });

      setError('');
      navigate('/account/login', { state: { successMessage: 'Cadastro realizado com sucesso!' } });;
      
    } catch (err: any) {
      if (err.response?.data){
        setError(Object.values(err.response.data).flat().join(' '));
      } else {
        setError('Erro no registro.');
      }
    }
  };

  const FIELDS: RegisterFormFields[] = [
    { label: 'First Name', name: 'first_name', type: 'text', placeholder: 'Enter your first name', required: true},
    { label: 'Last Name', name: 'last_name', type: 'text', placeholder: 'Enter your last name', required: true },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email', required: true },
    { label: 'Password', name: 'password1', type: 'password', placeholder: 'Enter your password', required: true },
    { label: 'Confirm Password', name: 'password2', type: 'password', placeholder: 'Confirm your password', required: true },
    { label: 'Date of Birth', name: 'date_of_birth', type: 'date', placeholder: 'dd/mm/aaaa', required: true },
  ];

  const REGISTER_PAGE = (
    <Centralize>
      <div className="h-[75%] w-[25%] min-w-[400px] min-h-[300px]" >

        <PiggyBox variant="primary">
          
          <Image src={logo} size="md" />

          <form onSubmit={handleSubmit} className="w-full h-5/6">
            <FormContainer>

              {
                FIELDS.map(
                  (field) => (
                    <FormField
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      type={field.type} 
                      value={formData[field.name as keyof RegisterForm]}
                      onChange={handleChange} 
                      placeholder={field.placeholder}
                      required={field.required}
                  />
                  )
                )
              }

              <PinkButton text="Sign up" />

            </FormContainer>
          </form>
          
          <p>Already have an account? <Link to="/account/login" style={{ textDecoration: 'underline', color: 'inherit' }} >Sign in</Link></p>
          
          <Message message={error} type="error" />
          
        </PiggyBox>

      </div>
    </Centralize>
  )

  return REGISTER_PAGE
}
