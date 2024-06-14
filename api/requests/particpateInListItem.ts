import axiosInstance from "@/util/axiosInstance";
import { getAuthHeader } from "@/api/utils";

type ParticpateInListItemProps = {
    listId: string | number;
    itemId: string | number;
    amount: number;
}

export const participateInListItem = async (props: ParticpateInListItemProps, token: string): Promise<any> => {
    let endpoint = `/lists/${props.listId}/items/${props.itemId}/assign?amount=${props.amount}`;
    console.log("Calling POST " + endpoint);

    const response = await axiosInstance.post(endpoint, {}, {
        headers: getAuthHeader(token),
    });

    if (response.status !== 200) {
        throw new Error("Error adding item to list");
    }

    return response.data;
}

