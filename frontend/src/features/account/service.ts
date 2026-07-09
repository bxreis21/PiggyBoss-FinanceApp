import API from "../../shared/service/api.js";
import type { RegisterDataToSend } from "./types.js";

export const registerUser = async ({ first_name, last_name, email, date_of_birth, password }: RegisterDataToSend) => {
  const dataToSend: RegisterDataToSend = {
    first_name,
    last_name,
    email,
    date_of_birth,
    password
  };

  const response: any = await API["account"].post('/register/', dataToSend);
  return response;
}