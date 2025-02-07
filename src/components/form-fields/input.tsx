import { ChangeEvent } from "react";
import "./form-fields.css";

export interface InputProps {
  label?: string;
  type: string;
  required: boolean;
  value: string;
  name: string;
  role: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  label,
  value,
  required,
  type,
  name,
  role,
  onChange,
}: InputProps) => {
  return (
    <div className="inputContainer">
      {label && <label htmlFor={name}>{label}:</label>}
      <input
        id={name}
        role={role}
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
