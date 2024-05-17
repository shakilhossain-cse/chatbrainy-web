import { toast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";

export const HttpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: { Accept: "application/json" },
  withCredentials: true,
});

HttpClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { data } = error.response;
      const errorMessage = (data && data?.message) || "An error occurred";
      const errorDescription = (data && data?.error) || "Unknown error";
      toast({
        title: errorMessage,
        description: errorDescription,
        variant: "destructive",
      });
    } else if (error.request) {
      toast({
        title: "Network Error",
        description: "No response received from the server",
        variant: "destructive",
      });
    } else {
      console.error("Request setup error:", error.message);
      toast({
        title: "Request Setup Error",
        description: "An error occurred while setting up the request",
        variant: "destructive",
      });
    }
    return Promise.reject(error);
  }
);