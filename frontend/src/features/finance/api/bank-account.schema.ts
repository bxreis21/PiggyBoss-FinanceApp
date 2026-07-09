export interface InstitutionSchema {
  id?: number;
  name: string;
  image?: string | null;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface BankAccountSchema {
  id?: number;
  user?: number | null;
  institution?: number | null;
  billing_day?: number;
  due_day?: number;
}

export interface CategorySchema {
  id?: number;
  user?: number | null;
  name: string;
  color?: string;
  icon?: string | null;
  balance_type?: 'expenses' | 'income';
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
  bank?: BankAccountSchema | null;
  start_date: string;
  maturity_date: string;
  status?: 'paid' | 'unpaid';
}
