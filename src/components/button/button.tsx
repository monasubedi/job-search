import "./button.css";

export interface ButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ title, type, disabled, onClick }: ButtonProps) => {
  return (
    <div className="btnContainer">
      {type === "submit" && (
        <button disabled={disabled} className="button" type={type}>
          {title}
        </button>
      )}
      {type === "button" && onClick && (
        <button
          disabled={disabled}
          type={type}
          className="button"
          onClick={onClick}
        >
          {title}
        </button>
      )}
    </div>
  );
};

export default Button;
