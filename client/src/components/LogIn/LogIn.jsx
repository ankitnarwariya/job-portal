import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";
import registerPoster from "../../assets/login-register.jpg";
import { logInUser } from "../../api/auth";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Fields can't be empty");
      return;
    }

    // const result = await logInUser(formData);
    // if (result) {
    //   navigate("/test");
    // }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-title">
          <h2>Already have an account?</h2>
          <p>Your personal job finder is here</p>
        </div>
        <form>
          <input
            type="email"
            value={formData.email}
            onChange={handleOnChange}
            placeholder="Email"
            className="login-input"
            name="email"
          />
          <input
            type="password"
            value={formData.password}
            onChange={handleOnChange}
            placeholder="Password"
            className="login-input"
            name="password"
          />

          <button type="submit" onClick={handleSubmit} className="login-button">
            Sign in
          </button>

          <p>
            Don't have an account?{" "}
            <b>
              <span
                onClick={() => navigate("/register")}
                className="register-link"
              >
                Register
              </span>
            </b>
          </p>
        </form>
      </div>
      <div className="login-right">
        <img src={registerPoster} alt="image" className="login-image" />
      </div>
    </div>
  );
};

export default Login;
