import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginService } from "../service/auth.service";
import { setUserData } from "../authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";

const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const mutation = useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      dispatch(setUserData(data.user));
      toast({
        title: "Login Successful",
      });
      const redirectTo = searchParams.get("redirectTo") || "/dashboard";
      router.push(redirectTo);
    },
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
      await mutation.mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
  };
};

export default useLogin;
