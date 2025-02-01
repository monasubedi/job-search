import "./button.css";

interface ButtonProps {
  title: string;
  onClick: () => void;
}

const Button = ({ title, onClick }: ButtonProps) => {
  return (
    <div className="btnContainer">
      <button className="button" onClick={onClick}>
        {title}
      </button>
    </div>
  );
};

export default Button;
