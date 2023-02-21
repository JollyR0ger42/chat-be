export interface User {
  login: string;
  password: string;
}

export interface UserPublic {
  login: string;
}

export interface Users {
  addUser(login: string, password: string): Promise<UserPublic | false>;
  getUser(login: string): Promise<User | null>;
  getAll(login: string): Promise<UserPublic[] | null>;
}
