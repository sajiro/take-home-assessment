import { MailIcon } from "lucide-react";
import Logout from "./logout";

export default function Header() {
  return (
    <header className="p-4 flex items-center justify-between bg-slate-50">
      <div className="flex items-center">
        <MailIcon className="h-6 text-gray-500 mr-2" />
        <h1 className="text-xl font-bold">Contact</h1>
      </div>

      <Logout />
    </header>
  );
}
