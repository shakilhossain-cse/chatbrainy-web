import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getOwnChatWidget,
  updateOwnChatWidget,
} from "../service/chat-widget.service";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadChatWidget, updateField } from "../chatWidgetSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import React from "react";
import { IChatWidget } from "@/interfaces/chat-widget.interface";

const useChatWidget = () => {
  const mutation = useMutation({
    mutationFn: updateOwnChatWidget,
    onSuccess: (data) => {
      // dispatch(loginUser(data.user));
    },
  });
  const formValues = useAppSelector((state) => state.chatWidget);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ["chat-widget"],
    queryFn: getOwnChatWidget,
  });
  // if (data) {
  //   dispatch(loadChatWidget(data));
  // }

  const FormSchema = z.object({
    name: z
      .string()
      .min(1, {
        message: "Name is required.",
      })
      .max(255, {
        message: "Name must not exceed 255 characters.",
      }),
    description: z
      .string()
      .min(1, {
        message: "Description is required.",
      })
      .max(255, {
        message: "Description must not exceed 255 characters.",
      }),
    message: z.string().optional(),
    website_url: z
      .string()
      .url({
        message: "Invalid URL format.",
      })
      .optional(),
    primary_color: z
      .string()
      .min(1, {
        message: "Widget color is required.",
      })
      .max(50, {
        message: "Widget color must not exceed 50 characters.",
      }),
    secondary_color: z
      .string()
      .min(1, {
        message: "Widget color is required.",
      })
      .max(50, {
        message: "Widget color must not exceed 50 characters.",
      }),
    icon: z
      .string()
     .optional()
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: formValues,
  });

  form.watch((data) => {
    (Object.entries(data) as [keyof IChatWidget, string][]).forEach(
      ([key, value]) => {
        dispatch(updateField({ key, value }));
      }
    );
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      console.log(data);
      // await mutation.mutateAsync(data);
      toast({
        title: "Update Widget Successful",
      });
    } catch (error) {
      console.error(error);
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      dispatch(updateField({ key: 'icon', value: url }));
    }
  };

  return {
    isLoading,
    form,
    onSubmit,
    isPending: mutation.isPending,
    onFileChange,
  };
};

export default useChatWidget;
