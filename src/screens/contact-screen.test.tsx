import { render, screen } from "@testing-library/react";
import ContactScreen from "./contact-screen";
import { describe, it, expect } from "vitest";

import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("render", () => {
  it("renders the contact screen page", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ContactScreen />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/Contact Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Picture/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Contact date/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Contact/i })
    ).toBeInTheDocument();
  });

  /* it("displays an error message when the input fields are empty", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ContactScreen />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const nameInput = screen.getByPlaceholderText(/name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const messageInput = screen.getByPlaceholderText(/message/i);

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();

   
  }); */
});
