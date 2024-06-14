import axiosInstance from "@/util/axiosInstance";

type LoginProps = {
    email: string;
    password: string;
}

export const login = async (props: LoginProps): Promise<User> => {
    console.log("Calling POST /users/login");
    props.email = props.email.toLowerCase();
    const response = await axiosInstance.post('/users/login', props);

    if (response.status !== 200) {
        throw new Error("Error logging in");
    }

    return response.data;
}