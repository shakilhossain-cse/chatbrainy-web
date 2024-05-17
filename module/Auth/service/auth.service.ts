import { IRegisterData, IUser } from "@/interfaces/user.interface";
import { HttpClient } from "@/lib/axios";

interface ILoginData {
  email: string;
  password: string;
}

interface IResetPasswordData {
  token: string;
  password: string;
  confirm_password: string;
}

export const loginUserService = async (): Promise<IUser> => {
  return HttpClient.get("/users/me");
};

export const loginService = async (
  data: ILoginData
): Promise<{
  user: IUser;
  token: string;
}> => {
  return HttpClient.post("/auth/signin", data);
};

export const registerService = async (data: IRegisterData): Promise<any> => {
  return HttpClient.post("/auth/signup", data);
};

export const logoutService = async (): Promise<any> => {
  return HttpClient.post("/auth/signout");
};

export const forgetPasswordService = async (data: {
  email: string;
}): Promise<any> => {
  return HttpClient.post("/auth/forget-password", data);
};

export const resetPasswordService = async (
  data: IResetPasswordData
): Promise<any> => {
  return HttpClient.post(`/auth/reset-password?token=${data.token}`, data);
};
