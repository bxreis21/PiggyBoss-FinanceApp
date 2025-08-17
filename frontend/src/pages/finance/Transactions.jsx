import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../../utils/api"
import styles from "./Transactions.module.css"
import nerd from "../../assets/images/nerd.png"
import { useAuth } from "../../context/AuthContext"
import PiggyBox from "../../components/PiggyBox"
import FormField from "../../components/FormField"
import PinkButton from "../../components/PinkButton"
import TransactionsView from "../../components/finance/TransactionsView"
import Message from "../../components/Message"
import NeedLogin from "../../components/NeedLogin"
import { fetchTransactions } from "../../services/financeServices"

export default function Transactions() {

  const navigate = useNavigate();
  const { userInfo, loading } = useAuth()
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [categories, setCategories] = useState([]);
  const [cards, setCards] = useState([]);
  const [banks, setBanks] = useState([]);
  const [thirds, setThirds] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    transactions_type: '',
    category: '',
    date: '',
    payment_method: '',
    card: '',
    bank: '',
    third: '',
    description: ''
  });

  useEffect(() => {
    if (!userInfo && !loading) return
    
    fetchOptions()
  }, [userInfo])


  const fetchOptions = async () => {
    try {
      const [catRes, cardRes, bankRes, thirdRes] = await Promise.all([
        API["finance"].get("/category/"),
        API["finance"].get("/card/"),
        API["finance"].get("/bank_account/"),
        API["finance"].get("/third/"),
      ]);
      
      setCategories(catRes.data);
      setCards(cardRes.data);
      setBanks(bankRes.data);
      setThirds(thirdRes.data);

    } catch (err) {
      if (err.response?.status === 401) {
        setError("Session Expired.")
      } else if (err.response?.data) {
        setError(Object.values(err.response.data).flat().join(' '));
      }
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['name', 'amount', 'transactions_type', 'date', 'payment_method'];
    const isValid = requiredFields.every(field => formData[field].trim() !== '');
    if (!isValid) {
      setError('Please fill in all the fields correctly.');
      setSuccess('');
      return;
    }

    try {
      await API["finance"].post("/transactions/", formData);
      setSuccess('Transaction added successfully!');
      setError('');
      setFormData({ name: '', amount: '', transactions_type: '', category: '', date: '', payment_method: '',
                  card: '', bank: '', third: '', description: '' });
      fetchTransactions();
    } catch (err) {
        if (err.response?.data){
            setError(Object.values(err.response.data).flat().join(' '));
        } else{
            setError('Error adding transaction');
        }
      
        setSuccess('');
    }
  };


  const SIMPLE_FIELDS = [
    { label: "Name of Transaction", name: "name", type: "text",  placeholder: 'Ex: Market', required: true, style: { width : "95%", gridColumn: "span 2" }},
    { label: "Description", name: "description", type: "text",  placeholder: 'Optional description', style: { width : "95%", gridColumn: "span 2" }},
    { label: "Amount", name: "amount", type: "text",  placeholder: '100.50', required: true, style: { width : "90%" }  },
    { label: "Date", name: "date", type: "date",  placeholder: 'Date', required: true, style: { width : "90%" }  },
  ]

  const SELECT_FIELDS = [
    { label: "Category", name: "category", placeholder: 'Select a category', options : categories, style: { width : "95%", gridColumn: "span 2" }  },
    { label: "Card", name: "card", placeholder: 'Select a card', options : cards, style: { width : "90%" }  },
    { label: "Bank", name: "bank", placeholder: 'Select a bank', options: banks, style: { width : "90%" }  },
  ]

  const SELECT_BASE_FIELDS = [
    { label: "Transactions Type", name: "transactions_type", placeholder: "Select a type", required: true,
      options: [{ value: "income", label: "Income" }, { value: "expense", label: "Expense" }, ],
      style: { width : "90%" } 
    },
    { label: "Payment Method", name: "payment_method", placeholder: "Select a Payment Method", required: true,
      options: [{ value: "card", label: "Card" }, { value: "cash", label: "Cash" }, { value: "pix", label: "Pix" }, ],
      style: { width : "90%" }
    }, 
  ];

  if (!userInfo && !loading) return <NeedLogin />
  else if (loading) return <></>

  return (
    <div className={styles["transactions-page"]}>
      <PiggyBox style = {{ width : "30%", height : "90%", minWidth : "300px", minHeight: "800px" }}>

        <div style={{margin: '5% 0 0 0' }}> 
            <img src={nerd} alt="Logo" className={styles['logo']} />
        </div>
        
        <h3 style = {{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>Register Your Transactions</h3>

        <form onSubmit={handleSubmit} style={{ width: '90%', height: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className={styles['form-container']}>
                {SIMPLE_FIELDS.map((simple_field) => (
                  <FormField
                    key={simple_field.name}
                    name={simple_field.name}
                    label={simple_field.label}
                    type={simple_field.type} 
                    value={formData[simple_field.name]}
                    onChange={handleChange} 
                    placeholder={simple_field.placeholder}
                    required={simple_field.required}
                    style = {simple_field.style}
                  />
                  ))
                }

                {SELECT_BASE_FIELDS.map((field) => (
                  <FormField
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    required={field.required}
                    style = {field.style}
                  >
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        height: '2.5rem',
                        fontSize: '1rem',
                        padding: '0.25rem',
                      }}
                      required={field.required}
                      >
                        <option value="" disabled>
                          {field.placeholder}
                        </option>
                        {field.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                      ))}
                    </select>
                  </FormField>
                ))}

                {SELECT_FIELDS.map((select_field) => (
                  <FormField
                    key={select_field.name}
                    name={select_field.name}
                    label={select_field.label} 
                    required 
                    style = {select_field.style}
                    >
                    <select
                      name={select_field.name}
                      value={formData[select_field.name]}
                      onChange={handleChange}
                      required={select_field.required}
                      >
                        <option value="" disabled >
                          {`${select_field.placeholder}`}
                        </option>
                        {select_field.options.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name || option.institution.name}
                          </option>
                        ))}
                    </select>
                  </FormField>
                  ))
                }
            </div>

          
          <PinkButton text="Add Transaction" style={{ width:"50%", height:"8%", marginTop:"3%", gridColumn: "span 2" }} />
          
        </form>

        <p
          style={{
            color: error ? 'red' : success ? 'lightgreen' : 'inherit',
            visibility: error || success ? 'visible' : 'hidden',
            margin: '2%'
          }}> {error || success || ''} 
        </p>

      </PiggyBox>


      <PiggyBox style ={{ width : "50%", minwidth : "300px", height : "90%", minheight : "100px" }} >
        <TransactionsView />
      </PiggyBox>

    </div>
  );
}
