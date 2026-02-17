export interface RegisterForm {
    first_name: string,
    last_name: string,
    email: string,
    date_of_birth: Date,
    password1: string,
    password2: string
}

export interface RegisterFormFields {
    label: string,
    name: string,
    type: string,
    placeholder: string, 
    required: boolean
}

export interface RegisterDataToSend {
    first_name: string,
    last_name: string,
    email: string,
    date_of_birth: Date,
    password: string
}