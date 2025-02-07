import { CircularProgress } from "@mui/material";
import { FormEvent } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import Input from "../../components/form-fields/input";
import "./auth.css";
import useAuth from "./useAuth";

const Login = () => {
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    signInMutation,
  } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    signInMutation.mutate({ email, password });
  };
  return (
    <div className="authContainer">
      <div className="authWrapper">
        <h1>Sign In</h1>
        <form role="form" onSubmit={(e) => handleSubmit(e)}>
          <Input
            label="Email"
            role="textbox"
            type="email"
            onChange={handleEmailChange}
            required={true}
            name="email"
            value={email}
          />
          <Input
            role="textbox"
            label="password"
            type="password"
            onChange={handlePasswordChange}
            required={true}
            name="password"
            value={password}
          />
          {signInMutation?.isPending ? (
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
              title="LOG IN"
              type="submit"
              disabled={signInMutation?.isPending}
            />
          )}

          <small className="smallText">
            Dont't have an account yet?{" "}
            <span className="link">
              <Link to={"/register"}>Sign up here..</Link>
            </span>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
