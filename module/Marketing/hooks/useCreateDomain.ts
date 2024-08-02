import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useCreateDomain = () => {
  const FormSchema = z.object({
    domain: z
      .string()
      .regex(/^(https?:\/\/)?([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/, {
        message: "Must be a valid domain with a top-level domain (TLD)",
      }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      domain: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Your domain has been created",
      description: `Domain: ${data.domain}`,
    });
  }

  return {
    form,
    onSubmit,
  };
};

export default useCreateDomain;
