
import axios from "axios";
import { ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utilities/authprovider";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [activeTab, setActiveTab] = useState("login");
  const [selectedRole, setSelectedRole] = useState("customer");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const roles = [
    {
      id: "customer",
      label: "Customer",
      icon: <ShoppingBag size={22} />,
    },
    {
      id: "seller",
      label: "Seller",
      icon: <User size={22} />,
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const role_id = selectedRole === "seller" ? 2 : 3;

      const res = await axios.post(
        "https://e-commerce-backend-l9wv.onrender.com/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: "",
          role_id,
        }
      );

      alert(
        res.data.message ||
          "Registration Successful"
      );

      setActiveTab("login");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "https://e-commerce-backend-l9wv.onrender.com/login",
        {
          email: formData.email,
          password: formData.password,
          role: selectedRole,
        }
      );

      if (res.data.success) {
        const userData = res.data.user;

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(userData)
        );

        setUser(userData);

        alert("Login Successful");

        if (userData.role_id === 2) {
          navigate("/seller");
        } else {
          navigate("/customer");
        }
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-black">
            MarketHub
          </h1>

          <p className="text-gray-500 mt-2">
            Multi-Vendor E-Commerce Platform
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() =>
                setActiveTab("login")
              }
              className={`py-3 rounded-xl font-semibold transition-all ${
                activeTab === "login"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveTab("register")
              }
              className={`py-3 rounded-xl font-semibold transition-all ${
                activeTab === "register"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              Register
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">
              Select Role
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {roles.map((role) => (
                <button
                  type="button"
                  key={role.id}
                  onClick={() =>
                    setSelectedRole(role.id)
                  }
                  className={`border rounded-xl py-4 flex flex-col items-center justify-center gap-2 transition-all ${
                    selectedRole === role.id
                      ? "border-black border-2"
                      : "border-gray-300"
                  }`}
                >
                  {role.icon}

                  <span className="font-medium">
                    {role.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <form
            className="space-y-4"
            onSubmit={
              activeTab === "login"
                ? handleLogin
                : handleRegister
            }
          >
            {activeTab === "register" && (
              <div>
                <label className="block font-semibold mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-100 outline-none"
                />
              </div>
            )}

            <div>
              <label className="block font-semibold mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-100 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-100 outline-none"
              />
            </div>

            {activeTab === "register" && (
              <div>
                <label className="block font-semibold mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm password"
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-100 outline-none"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-black text-white text-lg font-semibold hover:opacity-90 transition"
            >
              {loading
                ? "Please Wait..."
                : activeTab === "login"
                ? "Login"
                : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

