"use client";

import { Button, ButtonProps } from "@/components/tui/button";
import { cn } from "@/lib/utils";
import * as React from "react";

type Box = "round" | "square" | "double";

const DialogContext = React.createContext<{
  open: boolean;
  setOpen: (value: boolean) => void;
  dialogRef: React.RefObject<HTMLDialogElement>;
} | null>(null);

function Dialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }

    const handleClose = () => setOpen(false);
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [open]);

  return (
    <DialogContext.Provider value={{ open, setOpen, dialogRef }}>
      {children}
    </DialogContext.Provider>
  );
}

function DialogTrigger({ children, className, ...props }: ButtonProps) {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error("DialogTrigger must be used inside Dialog");

  return (
    <Button
      onClick={() => context.setOpen(true)}
      className={cn(className)}
      {...props}
    >
      {children}
    </Button>
  );
}

function DialogContent({
  children,
  box = "round",
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  box?: Box;
}) {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error("DialogContent must be used inside Dialog");

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        context.open &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        context.setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [context]);

  return (
    <dialog
      ref={context.dialogRef}
      popover="auto"
      className={cn("min-w-[20lh]", className)}
    >
      {/* TODO convert to box */}
      <div ref={wrapperRef} box-={box} className="w-full" {...props}>
        {children}
      </div>
    </dialog>
  );
}

const DialogTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-lg font-semibold mb-2", className)} {...props} />
);

const DialogDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-gray-500 mb-4", className)} {...props} />
);

export { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger };
