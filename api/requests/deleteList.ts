import axiosInstance from "@/util/axiosInstance";
import { getAuthHeader } from "@/api/utils";

export const deleteList = async (listId: string, token: string): Promise<any> => {
    console.log("Calling DELETE /lists")
    const response = await axiosInstance.delete(`/lists/${listId}`, {
        headers: getAuthHeader(token),
    });

    if (response.status !== 204) {
        throw new Error("Error deleting list ");
    }

    return response.data;
}
