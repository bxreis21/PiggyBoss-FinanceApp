export interface InstitutionSchema {
  id?: number;
  name: string;
  image?: string | null;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CategorySchema {
  id?: number;
  user?: number | null;
  name: string;
  color?: string;
  icon?: string | null;
  balance_type?: 'expenses' | 'income';
}

export interface BankAccountSchema {
  id?: number;
  user?: number | null;
  institution?: number | null;
  billing_day?: number;
  due_day?: number;
}

export interface ThirdPartySchema {
  id?: number;
  user?: number | null;
  name: string;
  relation: string;
}

export interface CreditCardBillSchema {
  id?: number;
  user?: number | null;
  bank?: number | null;
  start_date: string;
  maturity_date: string;
  status?: 'paid' | 'unpaid';
}

export interface TransactionSchema {
  id?: number;
  user?: number | null;
  name: string;
  transactions_type?: 'income' | 'expense';
  amount: number | string;
  category?: number | null;
  date?: string;
  payment_method?: 'debit' | 'credit';
  bank?: number | null;
  credit_card_bill?: number | null;
  third_party?: number | null;
  description?: string | null;
  created_at?: string;
  active?: boolean;
}
