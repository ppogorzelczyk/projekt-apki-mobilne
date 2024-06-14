import axiosInstance from "@/util/axiosInstance";
import { getAuthHeader } from "@/api/utils";

export const getLists = async (token: string): Promise<List[]> => {
    console.log("Calling GET /lists")

    const response = await axiosInstance.get('/lists', {
        headers: getAuthHeader(token),
    });

    if (response.status !== 200) {
        throw new Error("Error fetching lists");
    }

    const data = response.data as GetListsResponse;

    return data.lists;
}