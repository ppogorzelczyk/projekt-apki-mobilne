import axiosInstance from "@/util/axiosInstance";
import { getAuthHeader } from "@/api/utils";

type ShareProps = {
    listId: string;
    userId: number;
}

export const unshare = async (props: ShareProps, token: string): Promise<any> => {
    console.log("Calling DELETE /lists/:listId/share/:userId")
    const path = `/lists/${props.listId}/share/${props.userId}`;

    const response = await axiosInstance.delete(path, {
        headers: getAuthHeader(token),
    });

    if (response.status !== 204) {
        throw new Error("Error deleting share");
    }

    return response.data;
}
