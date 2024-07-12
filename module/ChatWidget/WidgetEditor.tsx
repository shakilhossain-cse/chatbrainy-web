"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useChatWidget from "./hooks/useChatWidget";
import ShowLinkModal from "./ShowLinkModal";

const WidgetEditor = () => {
  const { form, onSubmit, isPending, onFileChange, widgetId, isOpenScript,handelChangeScriptModal } =
    useChatWidget();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="w-fit">Chat Widget Editor</CardTitle>
          {!!widgetId && (
            <ShowLinkModal
              widgetId={widgetId}
              isOpenScript={isOpenScript}
              handelChangeScriptModal={handelChangeScriptModal}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Add widget name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Add widget description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website_url"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Add website URL"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="primary_color"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Primary Color</FormLabel>
                    <FormControl>
                      <Input type="color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondary_color"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Secondary Color</FormLabel>
                    <FormControl>
                      <Input type="color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Add widget icon"
                    onChange={onFileChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Initial Message</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Add widget icon"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending
                  ? widgetId
                    ? "Updating..."
                    : "Creating..."
                  : widgetId
                  ? "Update"
                  : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default WidgetEditor;
