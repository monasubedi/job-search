import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "../../src/layouts/router";
import AllProviders from "../AllProviders";

describe("Router", () => {
  const renderComponent = (path: string) => {
    const router = createMemoryRouter(routes, {
      initialEntries: [path],
    });
    render(
      <AllProviders>
        <RouterProvider router={router} />
      </AllProviders>
    );
  };

  it.todo("should render home page for '/' ", () => {
    renderComponent("/");
    expect(screen.getByRole("heading", { name: /home/i })).toBeInTheDocument();
  });
  it("should render login page for '/login' ", () => {
    renderComponent("/login");
    expect(
      screen.getByRole("heading", { name: /sign in/i })
    ).toBeInTheDocument();
  });
  it("should render register page for '/register' ", () => {
    renderComponent("/register");
    expect(
      screen.getByRole("heading", { name: /create an account/i })
    ).toBeInTheDocument();
  });
});
