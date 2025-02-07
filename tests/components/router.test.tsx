import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "../../src/layouts/router";

describe("Router", () => {
  const renderComponent = (path: string) => {
    const router = createMemoryRouter(routes, {
      initialEntries: [path],
    });
    render(<RouterProvider router={router} />);
  };

  it("should render home page for '/' ", () => {
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
  it("should render job list page for '/job-list/search' ", () => {
    renderComponent("/job-list/search");
    expect(
      screen.getByRole("heading", { name: /all jobs/i })
    ).toBeInTheDocument();
  });
  it("should render saved jobs page for '/saved-jobs' ", () => {
    renderComponent("/saved-jobs");
    expect(
      screen.getByRole("heading", { name: /saved job list/i })
    ).toBeInTheDocument();
  });
});
