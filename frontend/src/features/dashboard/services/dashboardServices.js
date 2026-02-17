import API from "../../../shared/services/api"

const handleError = (err) => {
    if (err.response?.status === 401) {
      setError('Session Expired.')
    } else if (err.response?.data) {
      setError(Object.values(err.response.data).flat().join(' '))
    } else {
      setError('Erro inesperado.')
    }
  }

export const fetchMonthBalance = async (params) => {
    try {
        const { data } = await API['dashboard'].get('/month-balance', { params })
        return data
    } catch (err) {
        handleError(err)
        return null
    }
}

export const fetchExpensesByCategory = async (params) => {
    try {
        const { data } = await API['dashboard'].get('/expenses-by-category', { params })
        return data
    } catch (err) {
        handleError(err)
        return null
    }
}

export const fetchCategoryExpensesDistribution = async (params) => {
    try {
        const { data } = await API['dashboard'].get('/category-expenses-distribution', { params })
        return data
    } catch (err) {
        handleError(err)
        return null
    }
}

export const fetchMonthBillTotal = async (params) => {
    try {
        const { data } = await API['dashboard'].get('/month-bill-total', { params })
        return data
    } catch (err) {
        handleError(err)
        return null
    }
}

export const fetchMonthlyBudgets = async (params) => {
    try {
        const [budgetRes, txRes, catRes] = await Promise.all([
            API['planning'].get('/budget/', { params }),
            API['finance'].get('/transactions/', { params }),
            API['finance'].get('/category/')
        ]);

        const budgets = budgetRes.data;
        const transactions = txRes.data;
        const categories = catRes.data;

        const { month, year } = params;

        const enrichedBudgets = budgets
            .filter(b => b.month === month && b.year === year)
            .map(b => {
                const totalSpent = transactions
                    .filter(tx => {
                        const txDate = new Date(tx.date);
                        const txMonth = txDate.getMonth() + 1;
                        const txYear = txDate.getFullYear();
                        const txCategoryId = tx.category?.id || tx.category;

                        return (
                            txCategoryId === b.category &&
                            txMonth === b.month &&
                            txYear === b.year &&
                            tx.transactions_type === 'expense'
                        );
                    })
                    .reduce((acc, tx) => acc + parseFloat(tx.amount), 0);

                const categoryObj = categories.find(c => c.id === b.category);

                return {
                    ...b,
                    spent: totalSpent,
                    category_name: categoryObj?.name || 'Unknown'
                };
            });

        return enrichedBudgets;
    } catch (err) {
        handleError(err);
        return [];
    }
};

export const deleteBudget = async (id) => {
  try {
    const { data } = await API['planning'].delete(`/budget/${id}/`);
    return data;
  } catch (err) {
    console.error("Failed to delete budget", err);
    return null;
  }
};