import React, { useState } from "react";

import backgroundImage from "../images/back.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let newErrors = { ...errors };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.firstname.trim()) {
      newErrors.firstname = "First name is required";
    } else {
      newErrors.firstname = "";
    }

    if (!data.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    } else {
      newErrors.lastname = "";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Invalid email format";
    } else {
      newErrors.email = "";
    }

    if (!data.password.trim()) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return Object.values(newErrors).some((error) => error !== ""); // Returns true if there are any errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = validate();
    if (hasErrors) {
      return; // Don't submit if there are validation errors
    }
    try {
      const { firstname, lastname, email, password } = data;
      const name = `${firstname} ${lastname};`;
      const user = { name, email, password };
      const res = await axios.post(
        "http://localhost:4000/api/auth/register",
        user
      );
      const newres = res.data;
      console.log("data submitted successfully: ", newres);
      setData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  console.log(data);
  return (
    <div
      className="min-h-screen py-40"
      style={{
        backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
      }}
    >
      <div className="container mx-auto">
        <div className=" flex w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="w-1/2 flex flex-col gap-3 justify-center items-center px-13"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h2 className="text-white text-3xl">Welcome</h2>
            <div>
              <p className="text-white text-center">
                We’re thrilled to have you here! Explore our offerings, connect
                with like-minded individuals, and discover a world of
                possibilities.
              </p>
            </div>
          </div>
          <div className="w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4">Register</h2>
            <p className="mb-4">
              Please create your account and join our community
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4 flex-col">
                <div className="flex gap-5">
                  <input
                    type="text"
                    name="firstname"
                    value={data.firstname}
                    placeholder="First Name"
                    className="border border-gray-400 py-1 px-2 w-full"
                    onChange={handleChange}
                  />
                  {errors.firstname && (
                    <p className="text-red-500 text-sm">{errors.firstname}</p>
                  )}
                  <input
                    type="text"
                    name="lastname"
                    value={data.lastname}
                    placeholder="Last Name"
                    className="border border-gray-400 py-1 px-2 w-full"
                    onChange={handleChange}
                  />
                  {errors.lastname && (
                    <p className="text-red-500 text-sm">{errors.lastname}</p>
                  )}
                </div>

                <input
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="Email"
                  className="border border-gray-400 py-1 px-2 w-full"
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  placeholder="Password"
                  className="border border-gray-400 py-1 px-2 w-full"
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-purple-400 px-3 py-2 border border-gray-600 mt-3 text-white text-center"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
