import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button, { ButtonProps } from "../../src/components/button/button";

const defaultProps: ButtonProps = {
  title: "test",
  type: "submit",
  disabled: false,
  onClick: vi.fn(),
};

describe("Button", () => {
  const renderComponent = (props: ButtonProps) => {
    const mockOnClick = vi.fn();
    render(<Button {...props} />);

    return {
      mockOnClick,
      user: userEvent.setup(),
      button: screen.getByRole("button", { name: props.title }),
    };
  };

  it("should render button with correct props", () => {
    const { button } = renderComponent(defaultProps);
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
    expect(button).not.toBeDisabled();
  });

  it("should call onClick function when the button type is btn", async () => {
    const mockOnClick = vi.fn();
    const { button, user } = renderComponent({
      ...defaultProps,
      type: "button",
      onClick: mockOnClick,
    });
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toBeDisabled();
    await user.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
