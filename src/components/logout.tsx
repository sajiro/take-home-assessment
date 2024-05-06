import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/service";

function Logout() {
  const navigate = useNavigate();

  const logOut = useMutation({
    mutationFn: logout,
    //onSuccess: (res) => {},
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    logOut.mutate();
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}

export default Logout;
