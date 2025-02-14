import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { Data, login, register } from "../../services";
import { ApiResponse } from "../../utils/types";

const useAuth = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const onSuccess = (data: ApiResponse) => {
    toast.success(data.message);
    localStorage.setItem("userData", JSON.stringify(data.data));
    setIsAuthenticated(!isAuthenticated);
    navigate("/");
  };
  const onError = (message: string) => {
    toast.error(message);
  };

  const signUpMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: (formData: Data) => register(formData),
    onSuccess: (data) => onSuccess(data),
    onError: (data) => onError(data.message),
  });
  const signInMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (formData: Data) => login(formData),
    onSuccess: (data) => onSuccess(data),
    onError: (data) => onError(data.message),
  });
  return {
    username,
    email,
    password,
    confirmPassword,
    signUpMutation,
    signInMutation,
    handleUserNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
  };
};

export default useAuth;
