import { PropsWithChildren, useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface FormField {
  value: string;
  error?: string;
}

interface Form {
  fields: {
    [key: string]: FormField;
  };
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const AddDialog = ({
  children,
  form,
  onSubmit,
  triggerContainer,
  isEditing,
  isLoading,
}: PropsWithChildren & {
  form: Form;
  onSubmit: (event: any) => void;
  triggerContainer: React.JSX.Element;
  isEditing: boolean;
  isLoading: boolean;
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerContainer}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(event) => {
            form.handleSubmit(event);
            onSubmit(event);

            if (
              closeRef.current &&
              (closeRef.current as HTMLButtonElement).click
            ) {
              (closeRef.current as HTMLButtonElement).click();
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "View contact" : "Create new contact"}
            </DialogTitle>
          </DialogHeader>
          {children}
          <DialogFooter className="my-3">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isEditing ? "Update" : "Save"}
            </Button>
            <DialogClose ref={closeRef} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
