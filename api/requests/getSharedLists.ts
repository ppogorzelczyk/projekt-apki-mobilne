import axiosInstance from "@/util/axiosInstance";
import { getAuthHeader } from "@/api/utils";

export const getSharedLists = async (token: string): Promise<List[]> => {
  console.log("Calling GET /lists/shared")
    const response = await axiosInstance.get('/lists/shared', {
      headers: getAuthHeader(token),
    });
    if (response.status !== 200) {
        throw new Error("Error fetching shared lists");
    }

    const data = response.data as GetSharedListsResponse;
    return data.lists;
}