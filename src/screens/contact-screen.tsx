import { AddDialog } from "@/components/add-dialog";
import ContactList from "@/components/contact-list";
import ProfilePhoto from "@/components/profile-photo";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Item } from "@/models";
import { createContact, getContacts, editContact, uploadItem } from "@/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function ContactScreen() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["Contacts"], queryFn: getContacts });
  const [contactName, setContactName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [photo, setPhoto] = useState<string>("");

  const [isEditing, setIsEditing] = useState(false);
  const [EditingID, setEditingID] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const addContactMutation = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Contacts"] });
    },
  });

  const editContactMutation = useMutation({
    mutationFn: (params: { contactId: string; updatedContact: Item }) =>
      editContact(params.contactId, params.updatedContact),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Contacts"] });
    },
  });

  const uploadMutation = useMutation({
    mutationFn: (pic: File) => uploadItem(pic),
    //TODO remove any
    onSuccess: (photo: any) => {
      setPhoto(photo?.$id);
      //queryClient.invalidateQueries({ queryKey: ["Contacts"] });
    },
  });

  const initialFormState = {
    fields: {
      name: { value: "", error: "" },
      date: { value: "", error: "" },
    },
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    },
  };

  const [form, setForm] = useState(initialFormState);

  const handleDialogSubmit = () => {
    if (!selectedDate) {
      return;
    }
    const newContact: Item = {
      date: selectedDate,
      name: contactName,
      pic: photo,
    };

    if (isEditing) {
      editContactMutation.mutate({
        contactId: EditingID,
        updatedContact: { ...newContact, $id: EditingID, pic: photo },
      });
    } else {
      addContactMutation.mutate(newContact);
    }

    resetForm();
  };

  const resetForm = () => {
    setForm(initialFormState);
    setContactName("");
    setSelectedDate(null);
    setIsEditing(false);
    setPreview("");
    setPhoto("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      uploadMutation.mutate(file);
    } else {
      setPreview("");
    }
  };

  const triggerContainer = (
    <div>
      <div className="text-left m-4">
        <Button
          onClick={() => {
            resetForm();
          }}
        >
          + Add Contact
        </Button>
      </div>
      <ContactList
        items={query.data ?? []}
        onContactClick={(contact) => {
          setIsEditing(true);
          setContactName(contact.name);
          setSelectedDate(contact.date);
          setEditingID(contact.$id || "");
          setPhoto(contact.pic);
          setPreview("");
        }}
      />
    </div>
  );

  return (
    <div>
      {query.isFetching && <Spinner />}

      <AddDialog
        form={form}
        onSubmit={handleDialogSubmit}
        triggerContainer={triggerContainer}
        isEditing={isEditing}
        isLoading={uploadMutation.isPending}
      >
        <div className="grid gap-4 py-4">
          <div className="grid">
            <Label htmlFor="name" className="my-3">
              Contact Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <div className="flex items-center">
              {uploadMutation.isPending && <Spinner />}
              {preview ? (
                <img
                  src={preview ?? ""}
                  alt="Preview"
                  className="w-10 h-10 mr-4 rounded-full"
                />
              ) : isEditing ? (
                <ProfilePhoto id={photo ?? ""} />
              ) : null}

              <Input id="picture" type="file" onChange={handleFileChange} />
            </div>
          </div>
          <div className="grid">
            <Label htmlFor="name" className="my-3">
              Last Contact date
            </Label>
            <DatePicker
              value={selectedDate ?? undefined}
              onChange={(date: Date | undefined) =>
                setSelectedDate(date || null)
              }
            />
          </div>
        </div>
      </AddDialog>
    </div>
  );
}

export default ContactScreen;
