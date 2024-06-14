type GetSharedListUsersResponse = {
  users: SharedListUser[];
}
type SharedListUser = {
  id: number;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}