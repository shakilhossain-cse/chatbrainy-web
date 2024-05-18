import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordService } from "../service/auth.service";
import { toast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

const useResetPassword = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: resetPasswordService,
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const FormSchema = z
    .object({
      password: z
        .string()
        .min(5, {
          message: "Password must be at least 5 characters.",
        })
        .max(50, {
          message: "Password must not exceed 50 characters.",
        }),
      confirm_password: z.string().min(5, {
        message: "Confirm Password must be at least 5 characters.",
      }),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords do not match.",
      path: ["confirm_password"],
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!token) return;
    try {
      await mutateAsync({ token, ...data });
      toast({
        title: "Your password has been reset",
        description:
          "Your password has been reset. Please login with your new password",
      });
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return {
    form,
    onSubmit,
    isPending,
    hasToken: !!token,
  };
};

export default useResetPassword;
