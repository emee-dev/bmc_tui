"use client";

import { Button, ButtonProps } from "@/components/tui/button";
import { cn } from "@/lib/utils";
import {
  createContext,
  HTMLAttributes,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box } from "@/components/tui/box";

type Box = "round" | "square" | "double";

const DialogContext = createContext<{
  open: boolean;
  setOpen: (value: boolean) => void;
  dialogRef: RefObject<HTMLDialogElement>;

  outside_open?: boolean;
  outside_onOpenChange?: (value: boolean) => void;
} | null>(null);

function Dialog({
  children,
  open,
  onOpenChange,
}: {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (val: boolean) => void;
}) {
  const [_open, _setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open === undefined) {
      if (_open && !dialog.open) {
        dialog.showModal();
      } else if (!_open && dialog.open) {
        dialog.close();
      }
    } else {
      if (_open && !dialog.open && open) {
        dialog.showModal();
      } else if ((!_open && dialog.open) || !open) {
        dialog.close();
      }
    }

    const handleClose = () => {
      _setOpen(false);
      onOpenChange?.(false);
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [_open, open]);

  return (
    <DialogContext.Provider
      value={{
        open: _open,
        setOpen: _setOpen,
        dialogRef,
        outside_open: open,
        outside_onOpenChange: onOpenChange,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

function DialogTrigger({ children, className, ...props }: ButtonProps) {
  const context = useContext(DialogContext);
  if (!context) throw new Error("DialogTrigger must be used inside Dialog");

  return (
    <Button
      onClick={() => {
        context.setOpen(true);
        context.outside_onOpenChange?.(true);
      }}
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
}: HTMLAttributes<HTMLDivElement> & {
  box?: Box;
}) {
  const context = useContext(DialogContext);
  if (!context) throw new Error("DialogContent must be used inside Dialog");

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        context.open &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        context.setOpen(false);
        context.outside_onOpenChange?.(false);
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
      <Box ref={wrapperRef} box={box} className="w-full" {...props}>
        {children}
      </Box>
    </dialog>
  );
}

const DialogTitle = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-lg font-semibold mb-2", className)} {...props} />
);

const DialogDescription = ({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-gray-500 mb-4", className)} {...props} />
);

export { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger };
