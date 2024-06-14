import axiosInstance from "@/util/axiosInstance";
import { getAuthHeader } from "@/api/utils";

export const getSharedListUsers = async (id: string, token: string): Promise<SharedListUser[]> => {
    console.log("Calling GET /lists/:id/share")
    const path = `/lists/${id}/share`;
    const response = await axiosInstance.get(path, {
        headers: getAuthHeader(token),
    });

    if (response.status !== 200) {
        throw new Error("Error fetching lists");
    }

    const data = response.data as GetSharedListUsersResponse;

    return data.users;
}