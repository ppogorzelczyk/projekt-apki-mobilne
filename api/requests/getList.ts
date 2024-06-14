import axiosInstance from "@/util/axiosInstance";
import { getAuthHeader } from "@/api/utils";

export const getList = async (id: string, token: string): Promise<GetListResponse> => {
    console.log("Calling GET /lists/:id")
    const response = await axiosInstance.get('/lists/' + id, {
        headers: getAuthHeader(token),
    });

    if (response.status !== 200) {
        throw new Error("Error fetching lists");
    }

    const data = response.data as GetListResponse;

    return data;
}