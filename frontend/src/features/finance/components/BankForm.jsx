import { useState, useEffect } from "react";
import FormField from "../../components/FormField";
import PiggyBox from "../PiggyBox";
import PinkButton from "../PinkButton";
import API from "../../utils/api";
import Image from "../Image";
import logo from "../../assets/images/nerd.png";
import { useAuth } from "../../context/AuthContext"
import { fetchInstitution } from "../../services/financeServices";

export default function BankForm( styles ){

    const { userInfo, loading } = useAuth()
    const [institutions, setInstitutions] = useState([])
    const account_typeOptions = ["checking", "savings", "investment", "joint"]
    const [formData, setFormData] = useState({
        institution: '',
        account_type: '',
    })

    const fetchData = async () => {
        try {
            const getInstitutions = await fetchInstitution()
            // console.log(getInstitutions)
            setInstitutions(getInstitutions)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!userInfo && !loading) return
        
        fetchData()
      }, [userInfo])

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['institution', 'account_type'];
        const isValid = requiredFields.every(field => formData[field].trim() !== '');
        if (!isValid) {
            return;
        }

        try {
            await API["finance"].post("/bank_account/", formData);
            setFormData({ institution: '', account_type: '',});
        } catch (err) {
            if (err.response?.data){
                console.log(Object.values(err.response.data).flat().join(' '));
            } else{
                console.log('Error adding bank_account');
            }
        }
    };

    const BANK_FORM = (
            <PiggyBox 
                style = {{ 
                    height : "55%", 
                    width : "40%",
                    maxHeight: "600px",
                    display : "flex",
                    flexDirection : "column",
                    justifyContent : "flex-start",
                    alignItems : "center",
                    }}>
                <div style={{ height: '25%', margin: '5% 0 0 0' }}> 
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
                        key="institution"
                        name="institution"
                        label="Institution"
                        required={true}
                        style={{
                            width : "90%",
                            paddingBottom: "5%",
                        }}
                        >
                        <select
                            name="institution"
                            value={formData["institution"]}
                            onChange={handleChange}
                            required={true}
                            >
                            <option value="" disabled>
                                Select a institution
                            </option>
                            
                            {institutions.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.name}
                                </option>
                            ))}
                        </select>
                        </FormField>
                        <FormField
                            key = "account_type"
                            name = "account_type"
                            label = "Account Type"
                            required= {true}
                            style={{
                                width : "90%"
                            }}
                            >
                            <select
                                name="account_type"
                                value={formData["account_type"]}
                                onChange={handleChange}
                                required={true}
                                >
                                <option value="" disabled>
                                    "Select a Account Type"
                                </option>
                                {account_typeOptions.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        </FormField>
                    </div>
                    <PinkButton text = "Add a Bank" style = {{ width: "40%", margin: "5%"}}/>
                </form>
            </PiggyBox>
    )

    return BANK_FORM
}
