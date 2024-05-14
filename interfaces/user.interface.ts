interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

interface IRegisterData extends Omit<IUser, "role"> {
  password: string;
  confirm_password: string;
}

export type { IUser, IRegisterData };
