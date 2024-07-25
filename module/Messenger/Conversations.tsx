"use client";

import React, { useEffect } from "react";
import useConversation from "./hooks/useConversation";
import UserListSkeleton from "./UserListSkeleton";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const Conversations = () => {
  const { conversations, isFetching, handelSelect,handelAddArchive } = useConversation();

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
      {conversations.map((conversation, index) => {
        return (
          <Card
            className="cursor-pointer mt-2 mr-10 flex items-center justify-between"
            style={{ marginRight: "1rem" }}
            key={index}
            onClick={() =>
              handelSelect(conversation.id, conversation.chatWidgetId)
            }
          >
            <div className="flex  items-center p-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="ml-6">
                <CardTitle>{conversation.name}</CardTitle>
                <CardDescription>Visitor Description</CardDescription>
              </div>
            </div>
            <div className="mr-10">
              <button className="bg-black text-white p-4">
                {conversation.unSeenCount}
              </button>
              <button onClick={() => handelAddArchive(conversation.id)} style={{ backgroundColor: "black" }} type="button">
                <Image
                  src="/align-right.png"
                  alt="img"
                  width={30}
                  height={30}
                />
              </button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Conversations;
