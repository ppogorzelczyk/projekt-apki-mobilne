import axiosInstance from "@/util/axiosInstance";
import { AxiosError } from "axios";

type RegisterProps = {
    email: string;
    password: string;
    username: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
}

export const register = async (props: RegisterProps): Promise<User> => {
    console.log("Calling POST /users/register");
    props.email = props.email.toLowerCase();
    try {
        const response = await axiosInstance.post('/users/register', props);

        return response.data;
    } catch (error: any) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 409) {
            throw new Error("Użytkownik o podanym adresie email już istnieje.");
        } else {
            throw new Error("Wystąpił błąd podczas rejestracji. Sprawdź wprowadzone dane i spróbuj ponownie.");
        }
    }
}