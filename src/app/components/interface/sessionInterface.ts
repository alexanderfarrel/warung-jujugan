interface User {
  email: string;
  id: string;
  image: string;
  imageName: string;
  order: number;
  orderConfirm: number;
  role: string;
  username: string;
}

export interface Session {
  accessToken: string;
  expires: string;
  user: User;
}
