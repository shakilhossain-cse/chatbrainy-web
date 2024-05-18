import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerService } from "../service/auth.service";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation'


const useRegister = () => {
  const router = useRouter();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: registerService,
  });

  const FormSchema = z.object({
    first_name: z.string().min(2, {
      message: "First name must be at least 2 characters."
    }).max(20, {
      message: "First name must not exceed 20 characters."
    }),
    last_name: z.string().min(2, {
      message: "Last name must be at least 2 characters."
    },).max(20, {
      message: "Last name must not exceed 20 characters."
    }),
    email: z.string().min(2, {
      message: "Email must be at least 5 characters.",
    },).max(255, {
      message: "Email must not exceed 255 characters.",
    }).email({
      message: "Invalid email format.",
    }),
    password: z.string().min(5, {
      message: "Password must be at least 5 characters.",
    }).max(50, {
      message: "Password must not exceed 50 characters.",
    }),
    confirm_password: z.string().min(5, {
      message: "Confirm Password must be at least 5 characters.",
    }),
  }).refine(data => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"]
  });;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
   try {
    await mutateAsync(data);
    router.push("/login");
    toast({
      title: "Register Successful , Please verify your email",
      description:"Please check your email and click on the link to verify your account"
    });
   } catch (error) {
    console.error(error)
   }
  }

  return {
    form,
    onSubmit,
    isPending
  };
};

export default useRegister;
