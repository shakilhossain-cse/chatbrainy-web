"use client";

import React, { useEffect } from "react";
import useVisitor from "./hooks/useVisitor";
import UserListSkeleton from "./UserListSkeleton";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserList: React.FC<{ widgetId: string }> = ({ widgetId }) => {
  const { data, isFetching, handelSelect } = useVisitor(widgetId);

  if (isFetching) {
    return (
      <div className="grid gap-2">
        <UserListSkeleton />
        <UserListSkeleton />
        <UserListSkeleton />
      </div>
    );
  }

  return (
    <div className="col-span-1">
      {data &&
        data.pages.map((page) =>
          page.visitors.map((visitor: any) => (
            <Card
              className="cursor-pointer"
              key={visitor.id}
              onClick={() => handelSelect(visitor.id, visitor.chatWidgetId)}
            >
              <div className="flex items-center p-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="ml-6">
                  <CardTitle>{visitor.name}</CardTitle>
                  <CardDescription>Visitor Description</CardDescription>
                </div>
              </div>
            </Card>
          ))
        )}
    </div>
  );
};

export default UserList;
