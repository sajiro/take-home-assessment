import { Item } from "@/models";
import { UserMinus } from "lucide-react";
import ContactListItem from "./contact-list-item";

interface ContactListProps {
  items: Item[];
  onContactClick: (item: Item) => void;
}

export default function ContactList({
  items,
  onContactClick,
}: ContactListProps) {
  return (
    <div className="p-4 sm:p-4">
      <ul className="space-y-4 w-full sm:max-w-md md:max-w-md lg:max-w-lg">
        {items.length > 0 ? (
          items.map((item) => (
            <ContactListItem
              key={item.$id}
              item={item}
              onClick={() => onContactClick(item)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center">
            <UserMinus size={50} />
            <p>No contacts found</p>
          </div>
        )}
      </ul>
    </div>
  );
}
