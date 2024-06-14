import axiosInstance from "@/util/axiosInstance";
import { getAuthHeader } from "@/api/utils";

type ParticpateInListItemProps = {
    listId: string | number;
    itemId: string | number;
}

export const deleteListItem = async (props: ParticpateInListItemProps, token: string): Promise<any> => {
    let endpoint = `/lists/${props.listId}/items/${props.itemId}`;
    console.log("Calling DELETE " + endpoint);

    const response = await axiosInstance.delete(endpoint, {
        headers: getAuthHeader(token),
    });

    if (response.status !== 204) {
        throw new Error("Error deleting item to list");
    }

    return response.data;
}

