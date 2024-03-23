import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate instead of Link
import "./Register.css";
import registerPoster from "../../assets/login-register.jpg";
import { registerUser } from "../../api/auth";

const Register = () => {
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const indianMobileRegex = /^[6-9]\d{9}$/;
  const strongPasswordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
    setErrors({ ...errors, [name]: "" }); // Clear error message when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      try {
        await registerUser(formData); //Sending to DB
        alert("User Registered");
        navigate("/login"); // Navigate to login page after successful registration
      } catch (error) {
        console.error(error);
        alert("Something went wrong");
      }
    }
  };

  const validateForm = () => {
    const { name, email, mobile, password, acceptTerms } = formData;
    const newErrors = { ...errors };

    if (!name) {
      newErrors.name = "Name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!indianMobileRegex.test(mobile)) {
      newErrors.mobile = "Enter Indian mobile number";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!strongPasswordRegex.test(password)) {
      newErrors.password = "Password must be strong";
    }

    if (!acceptTerms) {
      newErrors.acceptTerms = "Please accept the terms and conditions";
    }

    setErrors(newErrors);

    // Check if there are no errors
    return Object.values(newErrors).every((error) => error === "");
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="register-title">
          <h2>Create Account</h2>
          <p>Your personal job finder is here</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            className="register-input"
            onChange={handleOnChange}
          />
          <span className="error">{errors.name}</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            className="register-input"
            onChange={handleOnChange}
          />
          <span className="error">{errors.email}</span>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            placeholder="Mobile"
            className="register-input"
            onChange={handleOnChange}
          />
          <span className="error">{errors.mobile}</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            className="register-input"
            onChange={handleOnChange}
          />
          <span className="error">{errors.password}</span>
          <input
            type="checkbox"
            name="acceptTerms"
            id="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleOnChange}
          />
          <label htmlFor="acceptTerms" className="register-checkbox-label">
            By creating an account, I agree to our terms of use and privacy
            policy
          </label>
          <span className="error">{errors.acceptTerms}</span>
          <button type="submit" className="register-button">
            Create Account
          </button>

          <p>
            Already have an account?{" "}
            <b>
              <span
                onClick={() => navigate("/login")}
                className="register-link"
              >
                Log In
              </span>
            </b>
          </p>
        </form>
      </div>
      <div className="register-right">
        <img src={registerPoster} alt="image" className="register-image" />
      </div>
    </div>
  );
};

export default Register;
