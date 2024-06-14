import axiosInstance from "@/util/axiosInstance";
import { getAuthHeader } from "../utils";

type AddListItemProps = {
    title: string;
    description?: string;
    price: number;
    link?: string;
}

export const addListItem = async (listId: string, props: AddListItemProps, token: string): Promise<any> => {
    let endpoint = `/lists/${listId}/items`;
    console.log("Calling POST " + endpoint);
    const response = await axiosInstance.post(endpoint, props, {
        headers: getAuthHeader(token),
    });

    if (response.status !== 201) {
        throw new Error("Error fetching listItems");
    }

    return response.data;
}

