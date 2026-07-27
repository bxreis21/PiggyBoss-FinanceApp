import FinanceService from "../../shared/service/finance.js";

async function fetchFinanceData<T>(
    endpoint: string,
    setData: (data: Array<T>) => void,
    setError: (error: string) => void,
    errorMessage: string
) {
    const response = await new FinanceService(endpoint).get()

    if (response.status === 200) {
        setData(response.data)
    } else {
        setError(errorMessage)
    }
}

async function postFinanceData<T>(
    endpoint: string,
    data: T,
    setError: (error: string) => void,
    errorMessage: string
) {
    const response = await new FinanceService(endpoint).post(data)

    if (response.status !== 201) {
        setError(errorMessage)
    }
}

export {fetchFinanceData, postFinanceData}