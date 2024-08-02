"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCreateDomain from "./hooks/useCreateDomain";

const AddDomainForm = () => {
  const { form, onSubmit } = useCreateDomain();
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Add Domain</CardTitle>
        <CardDescription>Enter your valid domain</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your domain</FormLabel>
                  <FormControl>
                    <Input placeholder="chatbrainy.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-5">
              Add Domain
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddDomainForm;
