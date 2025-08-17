import { useState, useEffect } from "react";
import FormField from "../../components/FormField";
import PiggyBox from "../PiggyBox";
import PinkButton from "../PinkButton";
import API from "../../utils/api";
import Image from "../Image";
import logo from "../../assets/images/nerd.png";
import { useAuth } from "../../context/AuthContext"


export default function CategoriesForm( styles ){

    const { userInfo, loading } = useAuth()
    const [banks, setBanks] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        color: '#FFFFFF',
        balance_type: '',
    })

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['name', 'color', 'balance_type'];
        const isValid = requiredFields.every(field => formData[field].trim() !== '')
        if (!isValid) {
            return
        }

        try {
            await API["finance"].post("/categories/", formData)
            setFormData({ name: '', color: '', balance_type: ''})

        } catch (err) {
            if (err.response?.data){
                console.log(Object.values(err.response.data).flat().join(' '))
            } else{
                console.log('Error adding card')
            }
        
            setSuccess('');
        }
    };

    const SELECT_BASE_FIELDS = [
        { label: "Color", name: "color", placeholder: "Select a color", required: true,
        options: [
            { value: "#0f0b1f", label: "Dark" },
            { value: "#ff49b9", label: "Pink Piggy" },
            { value: "#a70be8", label: "Purple Piggy" },
            { value: "#f5f5f5", label: "White" },
            { value: "#2ecc71", label: "Good Green" },
            { value: "#c0392b", label: "Bad Red" },
         ],
        style: { width : "90%" } 
        },
        { label: "Category Type", name: "balance_type", placeholder: "Select a Category Type", required: true,
        options: [
            { value: "income", label: "Income" }, 
            { value: "expense", label: "Expense" },
        ],
        style: { width : "90%" }
        }, 
    ]

    const CATEGORIES_FORM = (
            <PiggyBox 
                style = {{ 
                    height : "65%", 
                    width : "40%",
                    maxHeight: "600px",
                    display : "flex",
                    flexDirection : "column",
                    justifyContent : "flex-start",
                    alignItems : "center",
                    }}>
                <div style={{ height: '20%', margin: '5% 0 0 0' }}> 
                    <Image scr = {logo} />
                </div>
                <form
                    onSubmit={handleSubmit}
                    style = {{ 
                        height : "50%", 
                        width : "100%",
                        margin: "5%",
                        display : "flex",
                        flexDirection : "column",
                        justifyContent : "flex-start",
                        alignItems : "center",
                        gap: "5%"
                    }}>

                    <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'space-around', alignItems: 'center', width: '100%', height: '100%'}}>
                    
                        <FormField
                            key="categoryName"
                            name="categoryName"
                            label="Category Name"
                            required={true}
                            style={{
                                width : "90%",
                                paddingTop: "5%",
                            }}
                        >
                        </FormField>
                        {SELECT_BASE_FIELDS.map((field) => (
                            <FormField
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            required={field.required}
                            style={{
                                width : "90%",
                                paddingTop: "5%",
                            }}
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
                    </div>
                
                <PinkButton text = "Add a Card" style = {{ width: "40%", margin: "5%" }}/>
                
                </form>
            </PiggyBox>
    )

    return CATEGORIES_FORM
}
