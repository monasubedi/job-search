import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useMutation } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { describe, expect, it, vi } from "vitest";
import Login from "../../src/pages/auth/login";
import AllProviders from "../AllProviders";

describe("Login", () => {
  const renderComponent = () => {
    render(
      <AllProviders>
        <MemoryRouter>
          <Login />
          <ToastContainer />
        </MemoryRouter>
      </AllProviders>
    );

    return {
      email: screen.queryByRole("textbox", { name: /email/i }),
      password: screen.queryByRole("textbox", { name: /password/i }),
      button: screen.queryByRole("button", { name: /log in/i }),
      link: screen.queryByRole("link", { name: /sign up/i }),
      user: userEvent.setup(),
    };
  };

  it("should render all the form fields for login page", async () => {
    const { email, password, button, link } = renderComponent();
    expect(
      screen.getByRole("heading", { name: /sign in/i })
    ).toBeInTheDocument();
    await screen.findByRole("form");
    expect(email).toBeInTheDocument();

    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });

  it("should validate the input fields", async () => {
    const { email, password, button, user } = renderComponent();
    await screen.findByRole("form");
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(email).toBeInvalid();
    expect(password).toBeInvalid();
  });

  it("should call onSubmit with the correct formData", async () => {
    const mockMutate = vi.fn().mockResolvedValue({ success: true });
    (useMutation as any).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isError: false,
      error: null,
    });
    const { email, password, button, user } = renderComponent();

    await screen.findByRole("form");
    await user.type(email, "test@gmail.com");
    await user.type(password, "test123");
    await user.click(button);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledTimes(1);
      expect(mockMutate).toHaveBeenCalledWith({
        email: "test@gmail.com",
        password: "test123",
      });
    });
  });

  it("should show loading while submitting the form", async () => {
    const mockMutate = vi.fn().mockResolvedValue(new Promise(() => {}));

    (useMutation as any).mockReturnValue({
      mutate: mockMutate,
      isPending: true,
      isError: false,
      error: null,
    });
    const { email, password, button, user } = renderComponent();

    await screen.findByRole("form");
    await user.type(email, "test@gmail.com");
    await user.type(password, "test123");
    await user.click(button);

    const loading = await screen.findByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

  it.todo("should return error if login fails", async () => {
    const mockMutate = vi.fn().mockRejectedValue("error");

    (useMutation as any).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      onError: () => "error",
    });
    const { email, password, button, user } = renderComponent();

    await screen.findByRole("form");
    await user.type(email, "test@gmail.com");
    await user.type(password, "test123");
    await user.click(button);
    expect(await screen.findByLabelText(/notifications/i)).toBeInTheDocument();
  });
});
