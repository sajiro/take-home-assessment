import { describe, it, expect, test } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./login-screen";

describe("render", () => {
  it("renders the login page", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(true).toBeTruthy();
  });

  it("checks if the login screen elements are present", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const signInText = screen.getByText(/sign in/i);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(signInText).toBeInTheDocument();

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("changes the values of the username and password inputs", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const usernameInput = screen.getByPlaceholderText(
      /username/i
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      /password/i
    ) as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: "user" } });
    fireEvent.change(passwordInput, { target: { value: "pass" } });

    expect(usernameInput.value).toBe("user");
    expect(passwordInput.value).toBe("pass");
  });

  it("submits the form with the input fields values", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const usernameInput = screen.getByPlaceholderText(
      /username/i
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      /password/i
    ) as HTMLInputElement;
    const form = screen.getByTestId("login-form");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpass" } });
    fireEvent.submit(form);

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("testpass");
  });
});
