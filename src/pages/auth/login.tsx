import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import Input from "../../components/form-fields/input";
import "./auth.css";

const Login = () => {
  return (
    <div className="authContainer">
      <div className="authWrapper">
        <h1>Sign In</h1>
        <form>
          <Input
            label="Email"
            type="email"
            onChange={() => {}}
            required={true}
            name="email"
            value={""}
          />
          <Input
            label="Password"
            type="password"
            onChange={() => {}}
            required={true}
            name="password"
            value={""}
          />
          <Button title="LOG IN" onClick={() => {}} />
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
