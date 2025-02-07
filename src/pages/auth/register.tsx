import { CircularProgress } from "@mui/material";
import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/button/button";
import Input from "../../components/form-fields/input";
import "./auth.css";
import useAuth from "./useAuth";

const Register = () => {
  const {
    username,
    email,
    password,
    confirmPassword,
    signUpMutation,
    handleUserNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
  } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords must match.");
      return;
    }
    signUpMutation.mutate({ username, email, password });
  };

  return (
    <div className="authContainer">
      <div className="authWrapper">
        <h1>Create an Account</h1>
        <form role="form" onSubmit={(e) => handleSubmit(e)}>
          <Input
            label="Username"
            type="text"
            onChange={handleUserNameChange}
            required={true}
            role="textbox"
            name="username"
            value={username}
          />
          <Input
            label="Email"
            type="email"
            onChange={handleEmailChange}
            required={true}
            name="email"
            role="textbox"
            value={email}
          />
          <Input
            label="Password"
            type="password"
            onChange={handlePasswordChange}
            required={true}
            name="password"
            role="textbox"
            value={password}
          />
          <Input
            label="Confirm Password"
            type="password"
            onChange={handleConfirmPasswordChange}
            required={true}
            role="textbox"
            name="confirmPassword"
            value={confirmPassword}
          />
          {signUpMutation?.isPending ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <Button
              title="SIGN UP"
              type="submit"
              disabled={signUpMutation?.isPending}
            />
          )}
          <small className="smallText">
            Already have an account?{" "}
            <span className="link">
              <Link to={"/login"}>Sign in here..</Link>
            </span>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Register;
