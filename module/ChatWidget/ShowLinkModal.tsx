import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const ShowLinkModal = ({
  widgetId,
  isOpenScript,
  handelChangeScriptModal,
}: {
  widgetId: string;
  isOpenScript: boolean;
  handelChangeScriptModal: (data: boolean) => void;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const scriptText = `<script src="https://chatbrainy.com/chatwidget.js" chat-widget-id="${widgetId}"></script>`;
    navigator.clipboard.writeText(scriptText).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
        handelChangeScriptModal(false)
      }, 10000); // Hide the confirmation message after 3 seconds
    });
  };

  const scriptText = (
    <span>
      <span style={{ color: "#a626a4" }}>&lt;script</span>{" "}
      <span style={{ color: "#50a14f" }}>src=</span>
      <span style={{ color: "#e45649" }}>
        {'"https://chatbrainy.com/chatwidget.js"'}
      </span>{" "}
      <span style={{ color: "#50a14f" }}>chat-widget-id=</span>
      <span style={{ color: "#e45649" }}>{`"${widgetId}"`}</span>
      <span style={{ color: "#a626a4" }}>&gt;&lt;/script&gt;</span>
    </span>
  );

  return (
    <AlertDialog open={isOpenScript}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-[150px]" onClick={() => handelChangeScriptModal(true)}>
          Show Script
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent style={{ maxWidth: "600px", overflow: "hidden" }}>
        <AlertDialogHeader>
          <AlertDialogTitle>Copy the Script Below</AlertDialogTitle>
          <AlertDialogDescription>
            To embed the chat widget on your website, copy the script below and
            paste it into your HTML:
            <pre
              style={{
                backgroundColor: "#f5f5f5",
                padding: "10px",
                borderRadius: "5px",
                marginTop: "10px",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
              }}
            >
              <code>{scriptText}</code>
            </pre>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handelChangeScriptModal(false)}>
            Cancel
          </AlertDialogCancel>
          <Button onClick={handleCopy}>
            {isCopied ? "Copied" : "Copy to Clipboard"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ShowLinkModal;
