import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordService } from "../service/auth.service";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";

const useResetPassword = (token: string) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: resetPasswordService,
  });
  const router = useRouter();
  const FormSchema = z
    .object({
      password: z.string().min(5, {
        message: "Password must be at least 5 characters.",
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
    try {
      await mutateAsync({ token, ...data });
      toast({
        title: "Your password has been reset",
        description:
        "Your password has been reset. Please login with your new password",
      });
      router.push("/login");
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

export default useResetPassword;
