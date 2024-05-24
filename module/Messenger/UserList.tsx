import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import React from "react";

const UserList = () => {
  return (
    <div className="col-span-1">
      <Card className="pointer">
        <div className="flex items-center p-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="ml-6">
            <CardTitle>Visitor</CardTitle>
            <CardDescription>Visitor Description</CardDescription>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserList;
