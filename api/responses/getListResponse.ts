type ListItem = {
  id: number;
  listId: number;
  title: string;
  description: string;
  price: number;
  link: string | null;
  photo: string | null;
  createdAt: string;
  updatedAt: string;
  assignees: Assignee[];
}

type Assignee = {
  id: number;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  amount: number;
}

type GetListResponse = {
  id: number;
  ownerId: number;
  title: string;
  description: string;
  eventDate: string;
  createdAt: string;
  updatedAt: string;
  items: ListItem[];
}
