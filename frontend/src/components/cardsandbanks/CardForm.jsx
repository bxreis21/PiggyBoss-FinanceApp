import { useState, useEffect } from "react";
import FormField from "../../components/FormField";
import PiggyBox from "../PiggyBox";
import PinkButton from "../PinkButton";
import API from "../../utils/api";
import Image from "../Image";
import logo from "../../assets/images/nerd.png";
import { useAuth } from "../../context/AuthContext"
import { fetchBanks, fetchInstitution } from "../../services/financeServices";


export default function CardForm( styles ){

    const { userInfo, loading } = useAuth()
    const [banks, setBanks] = useState([])
    const [institutions, setInstitutions] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        bank: '',
    })

    const getInstitutionDataById = (id, list) => {
        const item = list.find(opt => opt.id === id);
        return item ? item.name : '';
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const fetchData = async () => {
        try {
            const getBanks = await fetchBanks()
            const getInstitutions = await fetchInstitution()
            console.log(getBanks)
            console.log(getInstitutions)

            setBanks(getBanks)
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

        const requiredFields = ['bank', 'name'];
        const isValid = requiredFields.every(field => formData[field].trim() !== '');
        if (!isValid) {
            return;
        }

        try {
            await API["finance"].post("/card/", formData);
            setFormData({ name: '', bank: '',});
        } catch (err) {
            if (err.response?.data){
                console.log(Object.values(err.response.data).flat().join(' '));
            } else{
                console.log('Error adding card');
            }
        }
    };

    const CARD_FORM = (
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
                        key="cardName"
                        name="cardName"
                        label="Card Name"
                        required={true}
                        style={{
                            width : "90%",
                            paddingBottom: "5%",
                        }}
                    >
                    </FormField>
                    <FormField
                        key="bank"
                        name="bank"
                        label="Bank"
                        required={true}
                        style={{
                            width : "90%",
                            paddingBottom: "5%",
                        }}
                        >
                        <select
                            name="bank"
                            value={formData["bank"]}
                            onChange={handleChange}
                            required={true}
                            >
                            <option value="" disabled>
                                Select a bank
                            </option>
                            {banks.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.institution.name} - {capitalize(opt.account_type)}
                                </option>
                            ))}
                        </select>
                    </FormField>
                    
                    </div>
                    <PinkButton text = "Add a Card" style = {{ width: "40%", margin: "5%" }}/>
                </form>
            </PiggyBox>
    )

    return CARD_FORM
}
