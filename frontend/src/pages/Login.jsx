import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(data));

      navigate("/dashboard");
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 top-10 left-10 animate-pulse"></div>

      <div className="absolute w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-20 bottom-10 right-10 animate-pulse"></div>

      <motion.div
        initial={{
          opacity: 0,
          y: 80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          p-10
          rounded-3xl
          shadow-2xl
          w-full
          max-w-md
          text-white
          z-10
        "
      >
        <motion.h1
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="text-5xl font-extrabold text-center mb-2 text-white"
        >
          EduScoreX
        </motion.h1>

        <p className="text-center text-gray-300 mb-8">
          Student Performance Management System
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label className="block mb-2 font-semibold">Email</label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                bg-white/10
                border
                border-white/20
                p-4
                rounded-xl
                text-white
                placeholder-gray-300
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-400
              "
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold">Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                bg-white/10
                border
                border-white/20
                p-4
                rounded-xl
                text-white
                placeholder-gray-300
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-400
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full
              bg-cyan-500
              hover:bg-cyan-400
              text-black
              p-4
              rounded-xl
              font-bold
              transition-all
              duration-300
              hover:scale-105
            "
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
