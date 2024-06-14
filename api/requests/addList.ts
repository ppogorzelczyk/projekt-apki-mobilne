import axiosInstance from "@/util/axiosInstance";
import { getAuthHeader } from "@/api/utils";

type AddListProps = {
    title: string;
    description: string;
    eventDate?: string;
}

export const addList = async (props: AddListProps, token: string): Promise<any> => {
    console.log("Calling POST /lists")
    const response = await axiosInstance.post('/lists', props, {
        headers: getAuthHeader(token),
    });

    if (response.status !== 200) {
        throw new Error("Error fetching lists");
    }

    return response.data;
}
