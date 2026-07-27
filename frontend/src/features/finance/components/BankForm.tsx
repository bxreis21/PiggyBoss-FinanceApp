import { useState, useEffect } from "react";
import FormField from "../../../shared/components/FormField.js";
import PiggyBox from "../../../shared/components/PiggyBox.js"
import PinkButton from "../../../shared/components/PinkButton.js"
import { fetchFinanceData, postFinanceData } from '../service.js'
import type { InstitutionSchema } from '../schemas.js'


interface BankFormProps {
    onClose: () => void;
}

export default function BankForm({ onClose }: BankFormProps) {

    const [institutions, setInstitutions] = useState<Array<InstitutionSchema>>([]);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        institution: '',
        billing_day: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchFinanceData(
                    'institution',
                    setInstitutions,
                    setError,
                    'Failed to load institutions.'
                )
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const requiredFields = ['institution', 'billing_day'] as const;
        const isValid = requiredFields.every(field => formData[field as keyof typeof formData].toString().trim() !== '');
        if (!isValid) {
            return;
        }

        try {
            await postFinanceData(
                'bank-account',
                formData,
                setError,
                'Failed to add bank account.'
            )
            onClose();
            setFormData({ institution: '', billing_day: '',});
        } catch (err) {
            setError('An unexpected error occurred.')
            console.log(err)
        }
    };

    const BANK_FORM = (
        <PiggyBox variant="secondary">
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-start h-[50%] w-full m-[5%] gap-[10%]"
            >
                <div className="flex flex-col items-center justify-between w-full h-full">
                    <FormField
                        key="institution"
                        name="institution"
                        label="Institution"
                        type="select"
                        value={formData["institution"]}
                        onChange={handleChange}
                        placeholder="Select an institution"
                        required={true}
                    >
                        <select
                            name="institution"
                            value={formData["institution"]}
                            onChange={handleChange}
                            required={true}
                            className="w-full p-[0.7rem] rounded-lg border-none bg-[#444] text-white text-base placeholder:text-[#aaa]"
                        >
                            <option value="" disabled>
                                Select an institution
                            </option>
                            {institutions.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.name}
                                </option>
                            ))}
                        </select>
                    </FormField>
                    <FormField
                        key="billing_day"
                        name="billing_day"
                        label="Billing Day"
                        type="number"
                        value={formData["billing_day"]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const val = parseInt(e.target.value);
                            if (e.target.value === '' || (val >= 1 && val <= 31)) {
                                handleChange(e);
                            }
                        }}
                        placeholder="Select a billing day (1-31)"
                        required={true}
                    />
                </div>
                <div className="flex w-full justify-center gap-4">
                    <div onClick={onClose} className="w-[20%]">
                         <PinkButton text="Cancel" className="w-full py-2 text-sm" />
                    </div>
                    <PinkButton text="Add" className="w-[20%] py-2 text-sm" />
                </div>
            </form>
        </PiggyBox>
    )

    return BANK_FORM
}
