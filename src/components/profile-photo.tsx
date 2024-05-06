import { useQuery } from "@tanstack/react-query";
import { getPhoto } from "@/service";

interface PhotoProfileProps {
  id: string;
}

export default function ProfilePhoto({ id }: PhotoProfileProps) {
  const query = useQuery({
    queryKey: ["ContactPhoto", id],
    queryFn: () => getPhoto(id),
  });

  return <img src={query.data?.href} className="w-10 h-10 mr-4 rounded-full" />;
}
