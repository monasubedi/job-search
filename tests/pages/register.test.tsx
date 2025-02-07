import { useMutation } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "../../src/pages/auth/register";
import AllProviders from "../AllProviders";

describe("Register", () => {
  const renderComponent = () => {
    render(
      <AllProviders>
        <MemoryRouter>
          <Register />
          <ToastContainer />
        </MemoryRouter>
      </AllProviders>
    );

    return {
      username: screen.getByRole("textbox", { name: /username/i }),
      email: screen.getByRole("textbox", { name: /email/i }),
      password: screen.getByRole("textbox", { name: "Password:" }),
      confirmPassword: screen.getByRole("textbox", {
        name: /confirm password/i,
      }),
      button: screen.queryByRole("button", { name: /sign up/i }),
      user: userEvent.setup(),
    };
  };

  it("should render all the form fields for register page", async () => {
    const { username, email, password, confirmPassword, button } =
      renderComponent();
    await screen.findByRole("form");
    expect(username).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should validate the input fields", async () => {
    const { username, email, password, confirmPassword, button, user } =
      renderComponent();
    await screen.findByRole("form");
    await user.click(button);
    await user.type(email, "test");
    expect(username).toBeInvalid();
    expect(email).toBeInvalid();
    expect(password).toBeInvalid();
    expect(confirmPassword).toBeInvalid();
  });

  it("should password and confirm password match", async () => {
    const { username, email, password, confirmPassword, button, user } =
      renderComponent();
    await screen.findByRole("form");
    await user.type(username, "test");
    await user.type(email, "test@gmail.com");
    await user.type(password, "test123");
    await user.type(confirmPassword, "test12");
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/passwords must match/i)).toBeInTheDocument();
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
    const { username, email, password, confirmPassword, button, user } =
      renderComponent();
    await screen.findByRole("form");
    await user.type(username, "test");
    await user.type(email, "test@gmail.com");
    await user.type(password, "test123");
    await user.type(confirmPassword, "test123");

    await user.click(button);
    const loading = await screen.findByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

  it("should call onSubmit with the correct formData", async () => {
    const mockMutate = vi.fn().mockResolvedValue({ success: true });
    (useMutation as any).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isError: false,
      error: null,
    });
    const { username, email, password, confirmPassword, button, user } =
      renderComponent();
    await screen.findByRole("form");
    await user.type(username, "test");
    await user.type(email, "test@gmail.com");
    await user.type(password, "test123");
    await user.type(confirmPassword, "test123");

    await user.click(button);
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
      expect(mockMutate).toHaveBeenCalledWith({
        username: "test",
        email: "test@gmail.com",
        password: "test123",
      });
    });
  });
});
