import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../../src/components/navbar/navbar";
import {
  AuthContextProvider,
  useAuthContext,
} from "../../src/context/AuthContext";
import { nav_items } from "../../src/utils/constants";
import { Role } from "../../src/utils/types";

vi.mock("../../src/context/AuthContext", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAuthContext: vi.fn(),
  };
});

describe("Navbar", () => {
  beforeEach(() => {
    useAuthContext.mockReturnValue({
      isAuthenticated: true,
      userData: {
        userId: "12",
        token: "some token",
        roles: [Role.ROLE_ADMIN],
      },
    });
  });
  const renderComponent = () => {
    render(
      <MemoryRouter>
        <AuthContextProvider>
          <Navbar />
        </AuthContextProvider>
      </MemoryRouter>
    );
  };
  it.todo(
    "should render all items when the user is authenticated and the role is admin",
    async () => {
      useAuthContext.mockReturnValue({
        isAuthenticated: true,
        userData: {
          userId: "12",
          token: "some token",
          roles: [Role.ROLE_ADMIN],
        },
      });

      renderComponent();
      const listItems = screen.getAllByRole("listitem");
      listItems.forEach((_, i) => {
        if (nav_items[i].roles.includes(Role.ROLE_ADMIN)) {
          const items = screen.getAllByText(new RegExp(nav_items[i].title));
          items.forEach((item) => expect(item).toBeInTheDocument());
        }
      });
    }
  );
  it.todo(
    "should render only nav items when the user has user role",
    async () => {
      useAuthContext.mockReturnValue({
        isAuthenticated: true,
        userData: {
          userId: "12",
          token: "some token",
          roles: [Role.ROLE_USER],
        },
      });

      renderComponent();
      const listItems = screen.getAllByTestId("desktop-navItems");
      listItems.forEach((_, i) => {
        if (nav_items[i].roles.includes(Role.ROLE_USER)) {
          expect(
            screen.getByText(new RegExp(nav_items[i].title))
          ).toBeInTheDocument();
        }
      });
    }
  );
  it.todo(
    "should render only nav items when the user has employer role",
    async () => {
      useAuthContext.mockReturnValue({
        isAuthenticated: true,
        userData: {
          userId: "12",
          token: "some token",
          roles: [Role.ROLE_EMPLOYER],
        },
      });

      renderComponent();
      const listItems = screen.getAllByTestId("desktop-navItems");
      listItems.forEach((_, i) => {
        if (nav_items[i].roles.includes(Role.ROLE_EMPLOYER)) {
          expect(
            screen.getByText(new RegExp(nav_items[i].title))
          ).toBeInTheDocument();
        }
      });
    }
  );
  it("should render sign in and sign up when the user is not authenticated", async () => {
    globalThis.innerWidth = 1024;
    globalThis.dispatchEvent(new Event("resize"));
    useAuthContext.mockReturnValue({
      isAuthenticated: false,
      userData: {},
    });
    renderComponent();
    const signIn = screen.getByTestId(/desktop-signin/i);
    const signUp = screen.getByTestId(/desktop-signup/i);
    expect(signIn).toBeInTheDocument();
    expect(signUp).toBeInTheDocument();
  });
  it("should render logout when the user is authenticated", async () => {
    useAuthContext.mockReturnValue({
      isAuthenticated: true,
      userData: {
        userId: "12",
        token: "some token",
        roles: [Role.ROLE_ADMIN],
      },
    });
    renderComponent();
    const logout = screen.getByTestId(/desktop-logout/i);

    expect(logout).toBeInTheDocument();
  });
  it("should call logout fun: when logout is clicked", async () => {
    useAuthContext.mockReturnValue({
      isAuthenticated: true,
      userData: {
        userId: "12",
        token: "some token",
        roles: [Role.ROLE_ADMIN],
      },
      logout: vi.fn(),
    });
    renderComponent();
    const authContext = useAuthContext();
    const logout = screen.getByTestId(/desktop-logout/i);
    const user = userEvent.setup();
    await user.click(logout);

    expect(logout).toBeInTheDocument();
    expect(authContext.logout).toBeCalled();
  });
});
