import axiosInstance from "@/util/axiosInstance";
import { getAuthHeader } from "@/api/utils";

type ShareProps = {
    listId: string;
    email: string;
}

export const share = async (props: ShareProps, token: string): Promise<any> => {
    console.log("Calling POST /lists/:listId/share")
    const path = `/lists/${props.listId}/share`;

    const response = await axiosInstance.post(path, {
        email: props.email.toLowerCase(),
    }, {
        headers: getAuthHeader(token),
    });

    if (response.status !== 200) {
        throw new Error("Error sharing list");
    }

    return response.data;
}
