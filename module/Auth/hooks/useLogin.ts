import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginService } from "../service/auth.service";
import { useDispatch } from "react-redux";
import { login } from "../authSlice";
import { useRouter } from 'next/navigation'
import { useAppDispatch } from "@/store/hooks";

const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const {
    isPending,
    mutateAsync,
    data: loginData,
  } = useMutation({
    mutationFn: loginService,
  });
  const FormSchema = z.object({
    email: z
      .string()
      .min(5, {
        message: "Email must be at least 5 characters.",
      })
      .max(255, {
        message: "Email must not exceed 255 characters.",
      })
      .email({
        message: "Invalid email format.",
      }),
    password: z
      .string()
      .min(5, {
        message: "Password must be at least 5 characters.",
      })
      .max(50, {
        message: "Password must not exceed 50 characters.",
      }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await mutateAsync(data);
      console.log("login data is here", loginData);
      if (loginData) {
        dispatch(login(loginData.user));
        toast({
          title: "Login Successful",
        });
        router.push(`/`);
        // router.push('/')
      } else {
        console.error("Login data is undefined");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    form,
    onSubmit,
    isPending,
  };
};

export default useLogin;
