import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { forgetPasswordService } from "../service/auth.service";
import { useMutation } from "@tanstack/react-query";

const useForgetPassword = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: forgetPasswordService,
  });

  const FormSchema = z.object({
    email: z.string().email().min(2, {
      message: "Email must be at least 5 characters.",
    }),
    password: z.string().min(5, {
      message: "Password must be at least 5 characters.",
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
      toast({
        title: "Your verification link has been sent to your email",
        description:
          "Please check your email and click on the link to reset your password",
      });
    } catch (error) {
      console.log(error);
    }
  }
  return { isPending, form, onSubmit };
};

export default useForgetPassword;
