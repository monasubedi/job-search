import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { useAuthContext } from "../../src/context/AuthContext";
import { routes } from "../../src/layouts/router";
import AllProviders from "../AllProviders";

vi.mock("../../src/context/AuthContext", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAuthContext: vi.fn(),
  };
});

describe("Protected Router", () => {
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

  it("should render home page for '/' ", () => {
    (useAuthContext as any).mockReturnValue({
      isAuthenticated: true,
      userData: { userId: 12, token: "some token", roles: ["ROLE_ADMIN"] },
    });
    renderComponent("/");
    expect(screen.getByText(/job is waiting/i)).toBeInTheDocument();
  });

  it("should render job list page for '/job-list/search' ", () => {
    (useAuthContext as any).mockReturnValue({
      isAuthenticated: true,
      userData: { userId: 12, token: "some token", roles: ["ROLE_ADMIN"] },
    });
    renderComponent("/job-list/search");
    expect(
      screen.getByRole("heading", { name: /all jobs/i })
    ).toBeInTheDocument();
  });
  it("should redirect to login page if the user is not authenticated", () => {
    vi.mocked(useAuthContext as any).mockReturnValue({
      isAuthenticated: false,
    });
    renderComponent("/saved-jobs");
    const login = screen.getByRole("heading", { name: /sign in/i });

    expect(login).toBeInTheDocument();
  });
  it("should render saved jobs page for '/saved-jobs' ", () => {
    (useAuthContext as any).mockReturnValue({
      isAuthenticated: true,
      userData: { userId: 12, token: "some token", roles: ["ROLE_ADMIN"] },
    });
    renderComponent("/saved-jobs");
    expect(
      screen.getByRole("heading", { name: /my saved job list/i })
    ).toBeInTheDocument();
  });
});
