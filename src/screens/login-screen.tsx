import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginData } from "@/models";
import { login } from "@/service";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("draper.joseph@gmail.com");
  const [password, setPassword] = useState("Password1");

  const LoginMutation = useMutation({
    mutationFn: (data: LoginData) => login(data.username, data.password),
    onSuccess: (res) => {
      if (!res) {
        return;
      }
      navigate("/main");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("token", `yes`);
    LoginMutation.mutate({ username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className=" border-gray-300 p-6 rounded-lg shadow-sm bg-white">
          <h2 className="mb-2 text-center text-3xl font-extrabold text-gray-900">
            Sign in
          </h2>
          <form
            data-testid="login-form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:z-10 sm:text-sm"
            />
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
