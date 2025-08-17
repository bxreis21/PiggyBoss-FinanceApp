import styles from "./CardsAndBanks.module.css"
import SelectBox from "../../components/cardsandbanks/SelectBox";
import PiggyBox from "../../components/PiggyBox";
import BankForm from "../../components/cardsandbanks/BankForm";
import CardForm from "../../components/cardsandbanks/CardForm";
import CategoriesForm from "../../components/cardsandbanks/CategoriesForm";
import TransactionsView from "../../components/finance/TransactionsView"
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"
import API from "../../utils/api";
import * as financeServices from "../../services/financeServices"


export default function CardsAndBanks(){

    const { userInfo, loading } = useAuth()
    const [banks, setBanks] = useState([]);
    const [bankSelected, setBankSelected] = useState([]);
    const [cards, setCards] = useState([]);
    const [cardSelected, setCardSelected] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState([]);
    const [visibleForm, setVisibleForm] = useState(null);

    useEffect(() => {
        if (!userInfo && !loading) return 

        fetchOptions()
    }, [userInfo, loading])

    const fetchOptions = async () => {
        try {
            const [catRes, cardRes, bankRes] = await Promise.all([
                API["finance"].get("/category/"),
                API["finance"].get("/card/"),
                API["finance"].get("/bank_account/"),
            ]);

            setCategories(catRes.data)
            setCards(cardRes.data)
            setBanks(bankRes.data)

        } catch (err) {
            if (err.response?.status === 401) {
                console.log("Session Expired.");
            } else if (err.response?.data) {
                console.log(Object.values(err.response.data).flat().join(' '));
            }
        }
    }

    const CARDS_AND_BANKS = (
        <div className={styles["cardsandbanks"]}>
            <div className={styles["sidebar"]}>

                <SelectBox label="Banks" 
                    options = {banks.map(bank => bank.institution.name)} 
                    cardstyle = {{ width : "70%", height: "30%" }}
                    titlebuttonlabel = "+"
                    titlebuttoncallback = {() => setVisibleForm("bank")}
                    selectcallback = {setBankSelected}
                />

                <SelectBox label="Cards" 
                    options = {cards.map(card => card.name)} 
                    cardstyle={{ width : "70%", height: "30%" }}
                    titlebuttonlabel = "+"
                    titlebuttoncallback=  {() => setVisibleForm("card")}
                    selectcallback = {setCardSelected}
                />

                <SelectBox label="Categories" 
                    options = {categories.map(cat => cat.name)} 
                    cardstyle = {{ width : "70%", height: "30%" }}
                    titlebuttonlabel = "+"
                    titlebuttoncallback = {() => setVisibleForm("cat")}
                    selectcallback = {setCategorySelected}
                />

            </div>
            <div className={styles["content"]}>
                
                {visibleForm === 'bank' && <BankForm />}
                {visibleForm === 'card' && <CardForm />}
                {visibleForm === 'cat' && <CategoriesForm />}
                {visibleForm === null && 
                <PiggyBox style ={{ width : "90%", minwidth : "300px", height : "90%", minheight : "100px" }} >
                        <TransactionsView bank={bankSelected} card={cardSelected} category={categorySelected}/>
                </PiggyBox>
                }

            </div>
        </div>
    )

    return CARDS_AND_BANKS;
}
