"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/store/hooks";

const WidgetEditor = () => {
  const chatWidget = useAppSelector((state) => state.chatWidget);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat Widget Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={chatWidget.name} placeholder="Chat widget name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Chat widget Description" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="url">Website Url</Label>
              <Input id="url" placeholder="Your site url" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="color">Widget Color</Label>
              <Input id="color" type="color" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="logo">Widget Icon</Label>
              <Input id="logo" type="file" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="w-full">Update</Button>
      </CardFooter>
    </Card>
  );
};

export default WidgetEditor;
