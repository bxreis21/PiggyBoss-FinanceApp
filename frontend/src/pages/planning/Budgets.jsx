import { useState, useEffect } from "react";
import API from "../../utils/api";
import styles from "./Budgets.module.css";
import nerd from "../../assets/images/nerd.png";
import { useAuth } from "../../context/AuthContext";
import PiggyBox from "../../components/PiggyBox";
import FormField from "../../components/FormField";
import PinkButton from "../../components/PinkButton";
import NeedLogin from "../../components/NeedLogin";
import { useNavigate } from "react-router-dom";

export default function Budgets() {

    const navigate = useNavigate();
    const {userInfo, loading} = useAuth();

    const [budgets, setBudgets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        category: '',
        limit_value: '',
        month: '',
        year: ''
    });
    const [filter, setFilter] = useState({ month: '', year: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [hiddenBudgets, setHiddenBudgets] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (!userInfo && !loading) return;
        fetchBudgets();
        fetchCategories();
        fetchTransactions();
    }, [userInfo]);

    const fetchBudgets = async () => {
        try {
            const response = await API["planning"].get("/budget/");
            setBudgets(response.data);
            setError('');
        } catch (err) {
            if (err.response?.status === 401) {
                setError("Session Expired.");
            } else if (err.response?.data) {
                setError(Object.values(err.response.data).flat().join(' '));
            }
        }
    };

    const fetchCategories = async () => {
        try{
            const response = await API["finance"].get("/category/");
            setCategories(response.data);
        } catch (err){
            setError("Failed to fetch categories");
        }
    };

    const fetchTransactions = async () => {
        try {
            const res = await API["finance"].get("/transactions/");
            setTransactions(res.data);
        } catch (err) {
            console.error("Failed to fetch transactions", err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = ["category", "limit_value", "month", "year"];
        const isValid = requiredFields.every(field => formData[field].trim() !== '');
        if (!isValid){
            setError("Please fill in all the fields.");
            return;
        }

        try{
            await API["planning"].post("/budget/", formData);
            setSuccess("Budget added successfully!");
            setError('');
            setFormData({ category: '', limit_value: '', month: '', year: '' });
            fetchBudgets();
        } catch (err){
            if (err.response?.data) setError(Object.values(err.response.data).flat().join(' '));
            else setError("Failed to add budget");
        }
    };

    const handleEdit = async (id, updatedBudget) => {
        try {
            await API["planning"].put(`/budget/${id}/`, updatedBudget);
            fetchBudgets();
            setSuccess("Budget updated successfully!");
        } catch (err) {
            setError("Failed to update budget");
        }
    };

    const filteredBudgets = budgets.filter(budget => {
        const matchesMonth = filter.month ? String(budget.month) === filter.month : true;
        const matchesYear = filter.year ? String(budget.year) === filter.year : true;
        return matchesMonth && matchesYear && !hiddenBudgets.includes(budget.id);
    });

    const handleHideBudgets = (id) => {
        setHiddenBudgets(prev => [...prev, id]);
    };

    const handleShowAll = () => {
        setHiddenBudgets([]);
    };

    const handleDeleteBudget = async (id) => {
        if (!window.confirm("Are you sure you want to delete this budget?")) return;

        try {
            await API["planning"].delete(`/budget/${id}/`);
            setBudgets(budgets.filter((b) => b.id !== id));
        } catch (err) {
            console.error("Failed to delete budget", err);
        }
    };

    if (!userInfo && !loading) return <NeedLogin />;
    if (loading) return null;

    return (
        <div className={styles["budgets-page"]}>
            <PiggyBox style={{ width: "30%", minWidth: "300px", height: "90%" }}>
                <div style={{ margin: '5% 0 0 0' }}>
                    <img src={nerd} alt="Logo" className={styles['logo']} />
                </div>

                <h3 className={styles.title}>Register Your Budget</h3>

                <form onSubmit={handleSubmit} style={{ width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className={styles['form-container']}>
                        <FormField
                            name="limit_value"
                            label="Limit Value"
                            type="number"
                            value={formData.limit_value}
                            onChange={handleChange}
                            placeholder="Ex: 500.00"
                            required
                            style={{ width: "95%", gridColumn: "span 2" }}
                        />

                        <FormField
                            name="month"
                            label="Month"
                            type="number"
                            value={formData.month}
                            onChange={handleChange}
                            placeholder="1 to 12"
                            required
                            style={{ width: "90%" }}
                        />

                        <FormField
                            name="year"
                            label="Year"
                            type="number"
                            value={formData.year}
                            onChange={handleChange}
                            placeholder="Ex: 2025"
                            required
                            style={{ width: "90%" }}
                        />

                        <FormField
                            name="category"
                            label="Category"
                            required
                            style={{ width: "95%", gridColumn: "span 2" }}>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </FormField>
                    </div>
                    <PinkButton text="Add Budget" style={{ width: "50%", marginTop: "1rem" }} />
                </form>

                <p
                    style={{
                        color: error ? 'red' : success ? 'lightgreen' : 'inherit',
                        visibility: error || success ? 'visible' : 'hidden',
                        margin: '2%'
                    }}>
                    {error || success || ''}
                </p>
            </PiggyBox>

            <PiggyBox style={{ width: "30%", minWidth: "300px", height: "90%" }}>
                <h2 className={styles.title}>Budgets List</h2>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <FormField
                        name="month"
                        label="Filter by Month"
                        type="number"
                        value={filter.month}
                        onChange={handleFilterChange}
                        placeholder="1-12"
                        style={{ width: "45%" }}
                    />
                    <FormField
                        name="year"
                        label="Filter by Year"
                        type="number"
                        value={filter.year}
                        onChange={handleFilterChange}
                        placeholder="Ex: 2025"
                        style={{ width: "45%" }}
                    />
                </div>
                <button className={styles["show-all-button"]} onClick={handleShowAll}>
                    Show All History
                </button>

                <ul className={styles["budgets-list"]}>
                    {filteredBudgets.map((budget) => {
                        const categoryName = budget.category.name ||
                            (categories.find((c) => c.id === budget.category) || {}).name ||
                            "Unknown";

                        const totalSpent = transactions
                            .filter((tx) => {
                                const txDate = new Date(tx.date);
                                const txMonth = txDate.getMonth() + 1;
                                const txYear = txDate.getFullYear();
                                const txCategoryId = tx.category?.id || tx.category;

                                return (
                                    txCategoryId === budget.category || txCategoryId === budget.category.id
                                ) &&
                                    txMonth === budget.month &&
                                    txYear === budget.year;
                            })
                            .reduce((acc, tx) => acc + parseFloat(tx.amount), 0);

                        return (
                            <li key={budget.id} className={styles["budget-item"]}>
                                <strong>{categoryName}</strong> • R$ {parseFloat(budget.limit_value).toFixed(2)}<br />
                                <span>Spent: R$ {totalSpent.toFixed(2)}</span><br />
                                <span>{budget.month}/{budget.year} • </span>
                                <button className={styles["hide-button"]} onClick={() => handleHideBudgets(budget.id)}>
                                    Hide
                                </button>
                                <span> • </span>
                                <button className={styles["delete-button"]} onClick={() => handleDeleteBudget(budget.id)}>
                                    Delete
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </PiggyBox>
        </div>
    );
}
