import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import Input from "../../components/form-fields/input";
import "./auth.css";

const Register = () => {
  return (
    <div className="authContainer">
      <div className="authWrapper">
        <h1>Create an Account</h1>
        <form>
          <Input
            label="Username"
            type="text"
            onChange={() => {}}
            required={true}
            name="username"
            value={""}
          />
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
          <Input
            label="Confirm Password"
            type="password"
            onChange={() => {}}
            required={true}
            name="confirmPassword"
            value={""}
          />
          <Button title="SIGN UP" onClick={() => {}} />
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
