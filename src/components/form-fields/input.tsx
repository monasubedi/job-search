import "./form-fields.css";

interface InputProps {
  label?: string;
  type: string;
  required: boolean;
  value: string;
  name: string;
  onChange: () => void;
}

const Input = ({
  label,
  value,
  required,
  type,
  name,
  onChange,
}: InputProps) => {
  return (
    <div className="inputContainer">
      {label && <label>{label}:</label>}
      <input
        type={type}
        required={required}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
