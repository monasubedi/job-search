import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input, { InputProps } from "../../src/components/form-fields/input";

const defaultProps: InputProps = {
  type: "text",
  required: true,
  value: "some text",
  name: "test",
  role: "textbox",
  onChange: vi.fn(),
  label: "some test label",
};

describe("Input", () => {
  const renderComponent = (defaultProps: InputProps) => {
    render(<Input {...defaultProps} />);

    return {
      user: userEvent.setup(),
      input: screen.getByRole("textbox"),
      label: screen.queryByLabelText(/label/i),
    };
  };

  it("should render input with label", async () => {
    const { input, label } = renderComponent(defaultProps);

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("name", "test");
    expect(input).toBeRequired();
  });

  it("should call onChange method as user types", async () => {
    const mockOnChange = vi.fn();
    const { input, user } = renderComponent({
      ...defaultProps,
      onChange: mockOnChange,
    });
    await user.type(input, `some text{enter}`);
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalled();
    });
    // expect(mockOnChange).toHaveBeenCalledWith("some text");
  });

  it("should not show label when label is not provided", () => {
    const { label, input } = renderComponent({
      ...defaultProps,
      label: undefined,
    });
    expect(label).not.toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "test");
  });
});
