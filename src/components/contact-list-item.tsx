import { Item } from "@/models";
import dayjs from "dayjs";
import ProfilePhoto from "./profile-photo";

interface ContactListItemProps {
  item: Item;
  onClick: () => void;
}

export default function ContactListItem({
  item,
  onClick,
}: ContactListItemProps) {
  return (
    <li
      className="border border-gray-300 p-4 flex items-center rounded-lg hover:bg-gray-200 cursor-pointer"
      onClick={onClick}
    >
      {item.pic ? (
        <ProfilePhoto id={item.pic} />
      ) : (
        <img
          src={`https://picsum.photos/200/300`}
          alt={item.name}
          className="w-10 h-10 mr-4 rounded-full"
        />
      )}

      <div>
        <p className="font-bold text-left">{item.name}</p>
        <p>{dayjs(item.date).format("MM/DD/YYYY")}</p>
      </div>
    </li>
  );
}
