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
import React, { useEffect, useState } from "react";
import { IChatWidget } from "@/interfaces/chat-widget.interface";

const useChatWidget = () => {
  const [isOpenScript, setIsOpenScript] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const mutation = useMutation({
    mutationFn: updateOwnChatWidget,
    onSuccess: (data) => {
      // dispatch(loginUser(data.user));
    },
  });
  const formValues = useAppSelector((state) => state.chatWidget);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setIsLoading(true);
    getOwnChatWidget()
      .then((data) => {
        dispatch(loadChatWidget(data));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // const { data, isLoading } = useQuery({
  //   queryKey: ["chat-widget"],
  //   queryFn: getOwnChatWidget,
  // });
  // if (data) {
  //   console.log(data, "data");
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
      .max(255, {
        message: "Description must not exceed 255 characters.",
      })
      .optional(),
    message: z.string().optional(),
    website_url: z.string().url({
      message: "Invalid URL format.",
    }),
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
      const formData = new FormData();
      const dataObject = data as { [key: string]: any };
      for (const key in dataObject) {
        if (dataObject.hasOwnProperty(key) && key !== "icon") {
          formData.append(key, dataObject[key]);
        }
      }
      if (image) {
        formData.append("icon", image);
      }
      await mutation.mutateAsync(formData);
      setIsOpenScript(true);
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
      setImage(file);
      const url = URL.createObjectURL(file);
      dispatch(updateField({ key: "icon", value: url }));
    }
  };

  const handelChangeScriptModal = (data: boolean) => {
    setIsOpenScript(data)
  }

  return {
    isLoading,
    form,
    onSubmit,
    isPending: mutation.isPending,
    onFileChange,
    widgetId: formValues?.id,
    isOpenScript,
    handelChangeScriptModal
  };
};

export default useChatWidget;
